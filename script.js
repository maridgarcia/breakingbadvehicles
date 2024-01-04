let mainDiv = document.querySelector('.content-body');
let searchBar = document.querySelector('.search-bar');

searchBar.addEventListener('keyup', (e) => { 
    let tableContainer = document.getElementById('table-container');
    let searchValue = e.target.value.toLowerCase();
    let trData = document.querySelectorAll('tr');
    let found = false;

    trData.forEach((row, index) => {
        if (index === 0) {
            row.style.display = 'table-row';
            return;
        }
        let rowData = row.textContent.toLowerCase();
        if (rowData.includes(searchValue)) {
            row.style.display = 'table-row';
            found = true;
            return;
        } else {
            row.style.display = 'none';
        }
    });

    if (!found) {
        document.getElementById('notFoundMessage').style.display = 'block';
        tableContainer.style.display = 'none';
    } else {
        document.getElementById('notFoundMessage').style.display = 'none';
        tableContainer.style.display = 'block';
    }
})

const createTable = (data) => {
    const tableContainer = document.getElementById('table-container');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key.replace('_', ' ').toLocaleUpperCase();
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    tableContainer.appendChild(table);
};

const fetchData = async () => {
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.style.display = 'block';
    
    try {
        const data = await fetch('https://breakingbadcars.cyclic.app/');
        const response = await data.json();
        createTable(response);
    } catch (error) {
        console.log(error)
    } finally {
        loadingSpinner.style.display = "none";
    }
}

fetchData();