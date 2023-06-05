export const getAllCustomers = async () => {
    return fetch("http://localhost:8088/customers?_expand=user")
        .then(res => res.json())
}

export const getSingleCustomer = async (customerId) => {
    const response = await fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
    const data = await response.json()
    const singleCustomer = data[0]
    return singleCustomer
}

export const getEmployeeList = async () => {
    const response = await fetch("http://localhost:8088/users?isStaff=true")
    const employees = await response.json()
    return employees
}

export const getSingleEmployee = async (employeeId) => {
    const response = await fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
    const data = await response.json()
    const singleEmployee = data[0]
    return singleEmployee
}

export const getCurrentCustomer = async (honeyUserObject) => {
    const response = await fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
    const data = await response.json()
    // This grabs the first object in the returned array, even though the array is only one object in length we want that object specifically and not the array itself
    const customerObject = data[0]
    return customerObject
}

export const getCurrentEmployee = async (honeyUserObject) => {
    const response = await fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
    const data = await response.json()
    // This grabs the first object in the returned array, even though the array is only one object in length we want that object specifically and not the array itself
    const employeeObject = data[0]
    return employeeObject
}

export const updateCustomerProfile = async (profile, setFeedback) => {
    return fetch(`http://localhost:8088/customers/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(response => response.json())
        .then(() => {
            setFeedback("customer profile successfully saved")
        })
}

export const updateEmployeeProfile = async (profile, setFeedback) => {
    return fetch(`http://localhost:8088/employees/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(response => response.json())
        .then(() => {
            setFeedback("Employee profile successfully saved")
        })
}

export const deleteTicket = (ticketObject, getAllTickets) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
        method: "DELETE"
    })
        .then((getAllTickets))
}

export const completeTicket = async (ticketObject, getAllTickets, copy) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(copy)
    })
        .then(response => response.json())
        .then(getAllTickets)
}

export const claimTicket = (userEmployee, ticketObject, getAllTickets) => {

    fetch(`http://localhost:8088/employeeTickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            employeeId: userEmployee.id,
            serviceTicketId: ticketObject.id
        })
    })
        .then(response => response.json())
        .then(() => {
            getAllTickets()
        })

}

export const getTicketToEdit = async (ticketId) => {
    const response = await fetch(`http://localhost:8088/serviceTickets?id=${ticketId}`)
    const tickets = await response.json()
    const ticketToEdit = await tickets[0]
    return ticketToEdit
}

export const editTicket = (ticketId, ticket, setFeedback, setTimeout, navigate) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticket)
    })
        .then(response => response.json())
        .then(() => {
            setFeedback("Ticket successfully saved")
        })
        .then(() => {
            setTimeout(() => navigate("/tickets"), 3000)
        })
}

export const createNewTicket = (ticketToSendToAPI, navigate) => {
    return fetch(`http://localhost:8088/serviceTickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticketToSendToAPI)
    })
        .then(response => response.json())
        .then(() => {
            navigate("/tickets")
        })
}

export const getAllTickets = () => {
    return fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
        .then(response => response.json())
}

export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/employees?_expand=user`)
        .then(response => response.json())
}

