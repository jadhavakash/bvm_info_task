const initialState = [
    { id: 0, name: "Raman Sharma", email: "email@email.com", number: 1234567890, Gender: "Male" },
    // { id: 1, name: "Test Name", email: "test@test.com", number: 4567891230, Gender: "Male" },
];

const ContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CONTACT":
            state = [...state, action.payload];
            return state;
        case "UPDATE_CONTACT":
            const updateState = state.map(contact => contact.id === action.payload.id ? action.payload : contact);
            state = updateState;
            return state;
        case "DELETE_CONTACT":
            const contactFilter = state.filter(contact =>
                contact.id !== action.payload && contact
            );
            state = contactFilter;
            return state;
        default:
            return state;
    }
}

export default ContactReducer;