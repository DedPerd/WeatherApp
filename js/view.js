// Табы
document.querySelector('.forecast__nav-item').classList.add('forecast__nav-item_active');
document.querySelector('.forecast__tabs-item').classList.add('forecast__tabs-item_active');

document.querySelectorAll('.forecast__nav-item').forEach(item => {
    item.addEventListener('click', (event) => {
        document.querySelectorAll('.forecast__nav-item').forEach(item => {
            item.classList.remove('forecast__nav-item_active')
        });
        item.classList.add('forecast__nav-item_active');

        document.querySelectorAll('.forecast__tabs-item').forEach(item => {
            item.classList.remove('forecast__tabs-item_active');
        });
        const tabId = event.target.href.slice(event.target.href.lastIndexOf('#'));
        const tab = document.querySelector(tabId);
        tab.classList.add('forecast__tabs-item_active');
        event.preventDefault();
    });
});
//