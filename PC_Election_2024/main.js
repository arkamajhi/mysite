document.getElementById('btnSwitchdark').addEventListener('click',()=>{
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme','light')
        document.getElementById('btnSwitchdark').innerText = '🌙';
        document.getElementById('btnSwitchdark').style="background: black";

    }
    else {
        document.documentElement.setAttribute('data-bs-theme','dark')
        document.getElementById('btnSwitchdark').innerText = '💡';
        document.getElementById('btnSwitchdark').style="background: black";
    }
})

const csv= 'Andaman & Nicobar Islands,Andhra Pradesh,Arunachal Pradesh,Assam,Bihar,Chhattisgarh,Dadra & Nagar Haveli and Daman & Diu,Goa,Gujarat,Jammu and Kashmir,Jharkhand,Karnataka,Kerala,Ladakh,Lakshadweep,Madhya Pradesh,Maharashtra,Manipur,Meghalaya,Mizoram,Nagaland,Odisha,Puducherry,Rajasthan,Sikkim,Tamil Nadu,Telangana,Tripura,Uttar Pradesh,Uttarakhand,West Bengal';

const rows = csv.split(',');

console.log(rows);

for (i = 0; i < rows.length; i ++){
        document.getElementById('State_Results_Menu').innerHTML += '<li><a class="dropdown-item" href="#'+rows[i]+'">'+rows[i]+'</a></li><li><hr class="dropdown-divider"></li>';
    }
