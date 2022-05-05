
let arr
// get data by fetch api
let getdata = async () => {
    const url = "fetchapi.json";
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
// store responce in arr
getdata().then((res) => {
    let apidata = document.getElementById("testing")
    if (res.length > 0) {
        let fetchdata = "";
        res.forEach((items, index) => {
            fetchdata += `  <div class="col-lg-3 main11">
            <div class="card">
                <div class="card-header">
                <img width=100% height=200px src="${items.image}" alt="">
                </div>
                <div  class="card-body">
                    <h3>${items.price}  $</h3>
                    <p>${items.title}</p>   
                    <button onclick="view(event)" class="btn btn-primary" id="${items.id}" data-toggle="modal" data-target="#showcart">View details</button>
                </div>
            </div>
        </div>`
        });
        apidata.innerHTML = fetchdata;
    }
    arr = res;
    cartnumber()
});
// number of product in cart 
function cartnumber() {
    let cartarr = localStorage.getItem('localcart');
    let cartarrno = JSON.parse(cartarr);
    document.getElementById("cartno1").innerHTML = cartarrno.length;
    localStorage.setItem('localcart', JSON.stringify(cartarrno))
}
// view detail of product
var fid
function view(e) {
    fid = e.target.id;
    document.getElementById("protitle").innerHTML = arr[fid].title;
    document.getElementById("proimg").src = arr[fid].image;
    document.getElementById("proprice").innerHTML = arr[fid].price;
    document.getElementById("prorating").innerHTML = arr[fid].rating.rate;
    document.getElementById("prodesc").innerHTML = `${arr[fid].description} <br> <button type="button" onclick="addcart(event)" id="${arr[fid].id}" data-toggle="modal" data-target="#cartmodel" class="btn btn-primary">ADD TO CART</button>
    <button type="button" onclick="buyproduct(event)" class="btn btn-primary" data-toggle="modal" data-dismiss="modal" data-target="#showbill">BUY NOW</button>`;
    cartnumber();
    profile();
}
// add to cart 
var count = -1;
function addcart(e) {
    let eid = e.target.id;
    var verynewarr = [];
    var xdata = localStorage.getItem("localcart")
    var newarr = JSON.parse(xdata);
    let arrnew = []
    let new2arr
    if (newarr == null) {
        verynewarr.push(arr[eid]);
        localStorage.setItem("localcart", JSON.stringify(verynewarr));
        alert("added to cart");
        ++count;
    }
    else {
        let new1arr = localStorage.getItem("localcart");
        new2arr = JSON.parse(new1arr);
        arrnew = new2arr.filter(function (nitem, nindex) {
            if (nitem.id == eid) {
                return nitem;
            }
        });
        let len1 = arrnew.length;
        if (len1 == 0) {
            new2arr.push(arr[eid]);
            localStorage.setItem("localcart", JSON.stringify(new2arr));
            alert("added to cart");
            ++count;
        }
        else {
            alert("Already Added To Cart")
        }
    }
    cartnumber()
}
// showing cart data
function takedata() {
    let cart_data = localStorage.getItem("localcart");
    let new_cart_data = JSON.parse(cart_data);
    console.log("hellow");
    let list = "";
    new_cart_data.forEach((items, index) => {
        list += `
        <div class="col-lg-3">
        <div class="card">
        <div class="card-header">
        <img src="${items.image}" width=100% height="200">
        </div>
        <div class="card-body">
        <h3>${items.price}</h3>
        <p>${items.title}</p>
        <button type="button" onclick="removecart(${index})" class="btn btn-primary">REMOVE</button>
                    <button class="but1" id="${index}" onclick="subt(event)">-</button><input value="1" type="number" disabled id="${++count}inp11" ><button class="but1" id="${index}" onclick="addtion(event)">+</button>
        </div>
        </div>
        </div>
        `
    });
    document.getElementById("cartdata").innerHTML = list;
}
takedata();
// Enter into cart
function viewcart() {
    window.location = "cart.html"
}
// Remove item from cart
function removecart(e) {
    let old = localStorage.getItem("localcart");
    let oldcart = JSON.parse(old);
    oldcart.splice(e, 1);
    localStorage.setItem("localcart", JSON.stringify(oldcart));
    count = -1;
    takedata();
    totalbill();
}
// search product
function prosearch() {
    let to_search_data = document.getElementById("searchpro").value
    let search_data = to_search_data.toLowerCase();
    let search_result = arr.filter(function (sitem, sindex) {
        let dax = sitem.category.match(search_data);
        return sitem.category.match(search_data);
    })
    let newapidata = document.getElementById("productsearch")
    let newfetchdata = "";
    if (search_result.length > 0) {
        search_result.forEach((ssitems, ssindex) => {
            newfetchdata +=
                `<div class="col-lg-3 main11">
              <div class="card">
               <div class="card-header">
                 <img width=100% height=200px src="${ssitems.image}" alt="">
               </div>
                 <div  class="card-body">
                    <h3>${ssitems.price}  $</h3>
                    <p>${ssitems.title}</p>   
                    <button onclick="view(event)" class="btn btn-primary" id="${ssitems.id}" data-toggle="modal" data-target="#showcart">View details</button>
                 </div>
              </div>
            </div>`
        });
        document.getElementById("testing").style.display = 'none'
        newapidata.innerHTML = newfetchdata;
    }
}
// buy product
function buyproduct(e) {
    document.getElementById("billtitle").innerHTML = arr[fid].title;
    document.getElementById("billimg").src = arr[fid].image;
    document.getElementById("billprice").innerHTML = arr[fid].price;
    document.getElementById("billdesc").innerHTML = `<button class="btn btn-info" onclick="subkro()">-</button>
    <input id="${fid}inp111" type="number" value="1" disabled>
    <button class="btn btn-info" onclick="addkro()">+</button> <br>
    <input type="text" disabled id="sirfekbill">
    <button class="btn btn-danger" data-toggle="modal" data-target="#addadd" data-dismiss="modal" onclick="addadderss()">ADD ADDRESS</button>`
    ekkabill()
}
// subtract in single one buynow
function subkro() {
    var mx = Number(document.getElementById(`${fid}inp111`).value);
    if (mx > 1) {
        document.getElementById(`${fid}inp111`).value = --mx;
    }
    ekkabill()
}
// add in single one 
function addkro() {
    var mx = Number(document.getElementById(`${fid}inp111`).value);
    document.getElementById(`${fid}inp111`).value = ++mx;
    ekkabill()
}
// sum of all in single one
var payment
var singleprice 
function ekkabill() {
     payment = eval(arr[fid].price * document.getElementById(`${fid}inp111`).value);
    document.getElementById("sirfekbill").value = payment;
    singleprice = document.getElementById(`${fid}inp111`).value;
}
// seprate catageory from rowdata
function seprate(e) {
    let nex = e.target.id;
    let search_result = arr.filter(function (sitem, sindex) {
        return sitem.category.match(nex);
    })
    let newapidata = document.getElementById("productsearch")
    let newfetchdata = "";
    if (search_result.length > 0) {
        search_result.forEach((ssitems, ssindex) => {
            newfetchdata +=
                `<div class="col-lg-3 main11">
              <div class="card">
               <div class="card-header">
                 <img width=100% height=200px src="${ssitems.image}" alt="">
               </div>
                 <div  class="card-body">
                    <h3>${ssitems.price}  $</h3>
                    <p>${ssitems.title}</p>   
                    <button onclick="view(event)" class="btn btn-primary" id="${ssitems.id}" data-toggle="modal" data-target="#showcart">View details</button>
                 </div>
              </div>
            </div>`
        });
        document.getElementById("testing").style.display = 'none'
        newapidata.innerHTML = newfetchdata;
    }
}
// subtract in cart
var sid
var bil = []
function subt(e) {
    // bil = [];
    sid = e.target.id;
    var my = Number(document.getElementById(`${sid}inp11`).value);
    if (my > 1) {
        document.getElementById(`${sid}inp11`).value = --my;
    }
    totalbill()
}
// addition in cart
function addtion(e) {
    // bil = [];
    let aid = e.target.id;
    var my = Number(document.getElementById(`${aid}inp11`).value);
    document.getElementById(`${aid}inp11`).value = ++my;
    totalbill();
}
// sum of price 
var sumbill = 0;
function totalbill() {
    console.log(sumbill);
    sumbill=0;
    // console.log(bil);
    let billarr = localStorage.getItem('localcart');
    let arrbill = JSON.parse(billarr);
    for (let i = 0; i < arrbill.length; i++) {
        let inval = document.getElementById(`${i}inp11`).value;
        bil.push(inval)
    }
    for (let j = 0; j < arrbill.length; j++) {
    // console.log(bil);
    console.log(arrbill);
    let az = arrbill[j].price;
        let za = bil[j];
        sumbill += eval(az * za);
    }
    bil = []
    // console.log(sumbill);
    localStorage.setItem('localcart', JSON.stringify(arrbill))
    document.getElementById("total1").value = sumbill;

}
totalbill();
// add address
function addadderss() {
    document.getElementById("adddesc").innerHTML = `<div>
         First Name : <input type="text" id="fname"><br><br>
         Last Name : <input type="text" id="lname"><br><br>
         Mobile No. : <input type="text" id="mobile"><br><br>
         Country Name:<select name="" id="nation">
         <option value="">Chosse Your Country</option>
         <option value="india">India</option>
         <option value="USA">USA</option>
         <option value="nepal">Nepal</option>
              <option value="bhutan">Bhutan</option>
              <option value="france">France</option>
        </select><br><br>
        State Name:<select name="" id="state">
             <option value="">Chosse Your State</option>
              <option value="madhya pradesh">madhya pradesh</option>
              <option value="utter pardesh">utter pardesh</option>
              <option value="rajasthan">rajasthan</option>
              <option value="maharastra">maharastra</option>
              <option value="goa">goa</option>
              </select><br><br>
              Pin Code : <input type="text" id="pincode"><br><br>
        City Name:<select name="" id="city">
             <option value="">Chosse Your City</option>
              <option value="indore">indore</option>
              <option value="bhopal">bhopal</option>
              <option value="mumbai">mumbai</option>
              <option value="pune">pune</option>
              <option value="delhi">delhi</option>
              </select><br><br>
              Local : <input type="text" id="local"><br><br>
              Landmark : <input type="text" id="landmark"><br><br>
              House No. : <input type="text" id="makanno"><br><br>
              </div><br><br>
              <h5>PAYABLE AMOUNT : <input type="text" id="billing" disabled></h5>
              <br><button type="button" onclick="paynow()" class="btn btn-primary" data-toggle="modal" data-dismiss="modal" data-target="#paise">PAY NOW</button>`
    
             document.getElementById("billing").value = payment;
}
// single product 
function paynow(){
    let country = document.getElementById("nation").value;
    let state = document.getElementById("state").value;
    let pinc = document.getElementById("pincode").value;
    let citi = document.getElementById("city").value;
    let loc = document.getElementById("local").value;
    let mark = document.getElementById("landmark").value;
    let hno = document.getElementById("makanno").value;

    let addr = localStorage.getItem("address");
    if(addr == null){
     let addarr = [{
         'product_id': fid,
         'quantity' :singleprice,
         'country': country,
         'state' : state,
         'pincode' : pinc,
         'city'   : citi,
         'local' : loc,
         'landmark' : mark,
         'house_no' : hno
     }]
     localStorage.setItem('address',JSON.stringify(addarr));
    }
    else{
    let addr = localStorage.getItem("address");
    let addarr = JSON.parse(addr);
        console.log(addarr);
        console.log(addarr.length);
        addarr.push({
            'product_id': fid,
         'quantity' :singleprice,
         'country': country,
         'state' : state,
         'pincode' : pinc,
         'city'   : citi,
         'local' : loc,
         'landmark' : mark,
         'house_no' : hno
        });
        localStorage.setItem('address',JSON.stringify(addarr));
    }
}
// cart product buy
function buypro(){
    document.getElementById("adddesc").innerHTML = `<div>
    First Name : <input type="text" id="fname"><br><br>
    Last Name : <input type="text" id="lname"><br><br>
    Mobile No. : <input type="text" id="mobile"><br><br>
    Country Name:<select name="" id="nation">
    <option value="">Chosse Your Country</option>
    <option value="india">India</option>
    <option value="USA">USA</option>
    <option value="nepal">Nepal</option>
         <option value="bhutan">Bhutan</option>
         <option value="france">France</option>
   </select><br><br>
   State Name:<select name="" id="state">
        <option value="">Chosse Your State</option>
         <option value="madhya pradesh">madhya pradesh</option>
         <option value="utter pardesh">utter pardesh</option>
         <option value="rajasthan">rajasthan</option>
         <option value="maharastra">maharastra</option>
         <option value="goa">goa</option>
         </select><br><br>
         Pin Code : <input type="text" id="pincode"><br><br>
   City Name:<select name="" id="city">
        <option value="">Chosse Your City</option>
         <option value="indore">indore</option>
         <option value="bhopal">bhopal</option>
         <option value="mumbai">mumbai</option>
         <option value="pune">pune</option>
         <option value="delhi">delhi</option>
         </select><br><br>
         Local : <input type="text" id="local"><br><br>
         Landmark : <input type="text" id="landmark"><br><br>
         House No. : <input type="text" id="makanno"><br><br>
         </div><br><br>
         <h5>PAYABLE AMOUNT : <input type="text" id="billing" disabled></h5>
         <br><button type="button" onclick="paycatr()" class="btn btn-primary" data-toggle="modal" data-dismiss="modal" data-target="#">PAY NOW</button>`

        document.getElementById("billing").value = sumbill;

}
// 
function paycatr(){
    let country = document.getElementById("nation").value;
    let state = document.getElementById("state").value;
    let pinc = document.getElementById("pincode").value;
    let citi = document.getElementById("city").value;
    let loc = document.getElementById("local").value;
    let mark = document.getElementById("landmark").value;
    let hno = document.getElementById("makanno").value;
    
    let pro_id = [];
    let neware = localStorage.getItem('localcart');
    let are = JSON.parse(neware);
    for(x of are){
         pro_id.push(x.id);
    }
     let addarr = [{
         'product_id': pro_id,
         'quantity' : bil,
         'country': country,
         'state' : state,
         'pincode' : pinc,
         'city'   : citi,
         'local' : loc,
         'landmark' : mark,
         'house_no.' : hno
     }]
     localStorage.setItem('address1',JSON.stringify(addarr));
}
// final payment of single product
function suce(){
    let nodarr = localStorage.getItem('order')
    let odarr = JSON.parse(nodarr);
    if(odarr == null){
        odarr=[];
    odarr.push(arr[fid]);
    localStorage.setItem('order' , JSON.stringify(odarr))
    }
    else{
    odarr.push(arr[fid]);
    localStorage.setItem('order' , JSON.stringify(odarr))
    }
    alert("Order Placed")
}
// view profile and ordered product
function profile(){
    let xname = localStorage.getItem('login')
    let name = JSON.parse(xname);
    let xaddress = localStorage.getItem('address');
    let address = JSON.parse(xaddress);
    let noarr = localStorage.getItem('order');
    let odearr = JSON.parse(noarr);
    document.getElementById("orderlist").innerHTML=odearr.length;
    document.getElementById("ordertitle").innerHTML=name[0].name
    document.getElementById("orderadd").innerHTML=`${address[0].house_no} ${address[0].local} ${address[0].landmark} ${address[0].city} ${address[0].state} ${address[0].country} ${address[0].pincode}`
    odearr.forEach((oitems,oindex)=>{
    document.getElementById("orderprice").innerHTML += `<div class="col-lg">
    <div class="card">
    <div class="card-header">
    <img src="${oitems.image}" width=100% height="200">
    </div><br><br>
    <div class="card-body">
      <h6>${oitems.title}</h6>
      <p>${oitems.description}</p>
    </div>
    </div>
    </div>`
});
    localStorage.setItem('order',JSON.stringify(odearr));
    localStorage.setItem('address',JSON.stringify(address));
    localStorage.setItem('login',JSON.stringify(name));
} 
