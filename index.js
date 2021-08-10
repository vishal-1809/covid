api = 'https://api.covid19india.org/state_district_wise.json';


let districts = [];

fetch(api).then((responses) => {
    // console.log('fetching...');
    document.getElementById('load').style.display = "block";

    return responses.json();
}).then((data) => {
    // console.log('got it!');
    document.getElementById('load').style.display = "none";
    let done = true;
    state = Object.keys(data);
    state.forEach((key, index) => {
        // console.log(key);     // state name
        if (!key.includes("Unassigned") && done) {
            document.getElementById('list').innerHTML += `<td colspan="6"><strong>${key}</strong></td>`;
            Object.values(data[key]).forEach((val) => {
                for (var key in val) {
                    // console.log(key, val[key].active);    // key===district_name
                    let dist = key;
                    if (!dist.includes("Unknown") && !dist.includes("0") && !dist.includes("1") && !dist.includes("Unassigned")) {
                        document.getElementById('list').innerHTML += `
                            <td class="list ${key}" id="${districts.length + 1}">${districts.length + 1}</td>
                            <td class="list ${key} id="${key}"><strong>${key}</strong></td>
                            <td class="list ${key}">${val[key].confirmed}</td>
                            <td class="list ${key}">${val[key].active}</td>
                            <td class="list ${key}">${val[key].recovered}</td>
                            <td class="list ${key}">${val[key].deceased}</td>
                        `;
                        districts.push(key);
                    }
                }
            });
        }


    });

}).catch((error) => {
    // console.log(error);

})

function search() {
    let found = false;
    // console.log(document.getElementById('txt').value);
    let target = document.getElementById('txt').value;
    for (let i = 0; i < districts.length; i++) {
        // console.log(districts[i],target);
        if (districts[i].toLowerCase() === target.toLowerCase()) {
            document.getElementById(`${i + 1}`).style.backgroundColor = "red";
            setTimeout(() => {
                document.getElementById(`${i + 1}`).style.backgroundColor = "white";
            }, 3000);
            document.querySelector(`.${districts[i]}`).scrollIntoView({
                behavior: 'smooth'
            });
            found = true;
            break;
        }
    }
    if (!found) {
        document.getElementById('nsr').style.display = "block";
        setTimeout(() => {
            document.getElementById('nsr').style.display = "none";
        }, 2000);
    }
    document.getElementById('txt').value = "";
}


document.getElementById('search').addEventListener('click', search);