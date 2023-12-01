import HttpClient from "./utils/HttpClient"

class ContactsServices {
  constructor() {
    this.httpClient = new HttpClient("http://localhost:3001")
  }

  listContacts(orderBy = "asc") {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`)
  }

  createContact(contact) {
    return this.httpClient.post("/contacts", { body: contact })
  }

  getContactById(id) {
    return this.httpClient.get(`/contacts/${id}`)
  }

  updateContact(id, contact) {
    return this.httpClient.put(`/contacts/${id}`, { body: contact })
  }
}

export default new ContactsServices()
