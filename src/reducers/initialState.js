const initialState = {
    tasks: [],
    task: null,
    loading: {
        active: false,
        text: ''
    },
    filterCompleted: {
        active: false,
        filteredTasks: []
    }
};

export default initialState;