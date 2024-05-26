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
