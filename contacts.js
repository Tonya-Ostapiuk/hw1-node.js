const fs = require("fs").promises;
const path = require("path");
// const { nanoid } = require("nanoid");
// const newId = nanoid();
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
    try {
      const data = await fs.readFile(contactsPath);
      const result = JSON.parse(data);
       return result;  
    } catch (error) {
      console.log(error);
    }
  }

  async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const getContact = contacts.find(contact => contact.id === contactId);
        return getContact
          } catch (error) {
        console.log(error);
      }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const removeContact = contacts.find(contact => contact.id === contactId);
        const newContacts = contacts.filter(contact => contact.id !== contactId);
        fs.writeFile(contactsPath, JSON.stringify(newContacts));
        console.log(`id: ${contactId} `);
        return removeContact;   
      } catch (error) {
        console.log(error);
      }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const newContact = { name, email, phone, id: uuidv4()};
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return newContact;
       
      } catch (error) {
        console.log(error);
      }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
