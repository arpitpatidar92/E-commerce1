// onclick on signup button
function sign() {
    document.getElementById("main2").style.display = "block"
    document.getElementById("main3").style.display = "none"
}
// onclick on login button
function log_in() {
    document.getElementById("main3").style.display = "block";
    document.getElementById("main2").style.display = "none";
}
// signup form
function signup(e) {
    e.preventDefault();
    let name = document.getElementById("nm").value;
    let eid = document.getElementById("eid").value;
    let password1 = document.getElementById("pass1").value;
    let password2 = document.getElementById("pass2").value;
    let arr = [{ 'name': "", 'eid': "", 'password': "" }]
    let abc = localStorage.getItem("login")
    if (password1 === password2) {
        if (abc == null) {
            arr = [{ 'name': name, 'eid': eid, 'password': password1 }]
            localStorage.setItem("login", JSON.stringify(arr));
            alert("Sucessfull")
            document.getElementById("main2").style.display = "none";
            document.getElementById("main3").style.display = "block";
        }
        else {
            arr = JSON.parse(abc);
            arr.forEach((nitem, nindex) => {
                if (nitem.eid == eid) {
                    alert("already exist")
                }
                else {
                    arr.push({
                        'name': name, 'eid': eid, 'password': password1
                    });
                    localStorage.setItem("login", JSON.stringify(arr));
                    document.getElementById("main2").style.display = "none";
                    document.getElementById("main3").style.display = "block";
                }
            })
        }
    }
    else {
        alert("password does not match")
        document.getElementById("pass1").value = "";
        document.getElementById("pass2").value = "";
    }
    document.getElementById("nm").value = "";
    document.getElementById("eid").value = "";
    document.getElementById("pass1").value = "";
    document.getElementById("pass2").value = "";
}
// log-in form
function login(f) {
    f.preventDefault();
    let narr = localStorage.getItem("login");
    let newarr = JSON.parse(narr);
    let neweid = document.getElementById("leid").value;
    let newpass = document.getElementById("lpass").value;
    let newiddata = []; 
    newiddata = newarr.filter(function (item, index) {
        return (item.eid === neweid && item.password === newpass);
    });
    let len1 = newiddata.length
    if (len1 != 0) {
        window.location="../index/main_page.html"
    }
    else {
        alert("invalid user name or password");
        document.getElementById("leid").value = "";
        document.getElementById("lpass").value = "";
    }
}
