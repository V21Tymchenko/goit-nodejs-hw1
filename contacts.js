const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(contactsData);
    return result;
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(
      (contact) => contact.id.toString() === contactId
    );
    if (!contact) {
      return;
    }
    return contact;
  } catch (err) {
    console.error(err.message);
  }
}
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id.toString() === contactId
    );
    if (contactIndex === -1) {
      return;
    }
    const removedContact = contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
  } catch (err) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    const refreshedContacts = [newContact, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(refreshedContacts));
    return newContact;
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
