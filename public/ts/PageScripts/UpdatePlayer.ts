console.log('yay')
const deleteContainer = document.getElementById('delete-container')!;

const deleteBtn = document.getElementById('deleteBtn')!;


window.addEventListener('click', (event) => {
    if (deleteContainer.classList.contains('active') && !(deleteContainer === event.target) && !(deleteBtn === event.target)) {
        deleteContainer.classList.remove('active')
    }
})

deleteBtn.addEventListener('click', () => {
    deleteContainer.classList.add('active')
})