const API_URL = "http://127.0.0.1:5000/contacts";

async function loadContacts() {
    const res = await fetch(API_URL);
    const data = await res.json();
    const list = document.getElementById("contactList");
    list.innerHTML = "";

    data.forEach(c => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${c.name} - ${c.phone}</span>
            <span class="contact-buttons">
                <button class="edit" onclick="editContact(${c.id}, '${c.name}', '${c.phone}')">Modify</button>
                <button class="delete" onclick="deleteContact(${c.id})">Delete</button>
            </span>
        `;
        list.appendChild(li);
    });
}

async function addContact() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !phone) {
        alert("Please enter name and phone");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email: "" })
    });

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    loadContacts();
}

async function deleteContact(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadContacts();
}

function editContact(id, name, phone) {
    const newName = prompt("Enter new name:", name);
    const newPhone = prompt("Enter new phone:", phone);
    if (newName && newPhone) {
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newName, phone: newPhone, email: "" })
        }).then(() => loadContacts());
    }
}

document.getElementById("addBtn").onclick = addContact;

loadContacts();
