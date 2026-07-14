import { FieldValue } from "firebase-admin/firestore";
import { FirebaseUnavailableError, getFirebaseAdmin } from "./firebaseAdmin.js";

function timestampToIso(value) {
  if (value?.toDate) return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  return typeof value === "string" ? value : "";
}

function toContactMessage(document) {
  const data = document.data();
  return {
    id: document.id,
    name: data.name || "",
    email: data.email || "",
    company: data.company || "",
    inquiryType: data.inquiryType || "",
    projectContext: data.projectContext || "",
    message: data.message || "",
    status: data.status || "new",
    internalNote: data.internalNote || "",
    createdAt: timestampToIso(data.createdAt),
    updatedAt: timestampToIso(data.updatedAt)
  };
}

export function createFirestoreContactStore(config) {
  function collection() {
    return getFirebaseAdmin(config).firestore.collection("portfolioContacts");
  }

  return {
    async create(submission) {
      const document = {
        ...submission,
        status: "new",
        internalNote: "",
        source: "portfolio-contact-form",
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      };
      const reference = await collection().add(document);
      return reference.id;
    },

    async list({ limit, cursor }) {
      const contacts = collection();
      let query = contacts.orderBy("createdAt", "desc").limit(limit);
      if (cursor) {
        const cursorDocument = await contacts.doc(cursor).get();
        if (cursorDocument.exists) query = query.startAfter(cursorDocument);
      }

      const [snapshot, totalSnapshot, newSnapshot, contactedSnapshot, archivedSnapshot] = await Promise.all([
        query.get(),
        contacts.count().get(),
        contacts.where("status", "==", "new").count().get(),
        contacts.where("status", "==", "contacted").count().get(),
        contacts.where("status", "==", "archived").count().get()
      ]);
      const lastDocument = snapshot.docs.at(-1);

      return {
        messages: snapshot.docs.map(toContactMessage),
        nextCursor: snapshot.size === limit && lastDocument ? lastDocument.id : null,
        counts: {
          total: totalSnapshot.data().count,
          new: newSnapshot.data().count,
          contacted: contactedSnapshot.data().count,
          archived: archivedSnapshot.data().count
        }
      };
    },

    async update(id, updates) {
      const reference = collection().doc(id);
      const existing = await reference.get();
      if (!existing.exists) return null;
      await reference.update({
        ...updates,
        updatedAt: FieldValue.serverTimestamp()
      });
      return toContactMessage(await reference.get());
    },

    async delete(id) {
      const reference = collection().doc(id);
      const existing = await reference.get();
      if (!existing.exists) return false;
      await reference.delete();
      return true;
    }
  };
}

export { FirebaseUnavailableError };
