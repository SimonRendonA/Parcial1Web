const fetchData='https://gist.githubusercontent.com/jhonatan89/719f8a95a8dce961597f04b3ce37f97b/raw/4b7f1ac723a14b372ba6899ce63dbd7c2679e345/products-ecommerce';
var list;
var favs = new Array();
var body= document.body;





var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits:0,
  });
  
function listado(data){
    let content=document.getElementById('content');
    let originalElement= document.getElementsByClassName('element')[0];
    document.getElementById('detail').style.visibility="hidden";
    document.getElementById('detail').style.height="0px";
    document.getElementById('content').style.visibility="visible";
    document.getElementById('content').style.height="100px";
    document.getElementById('favs').addEventListener("click",function(){ showFavs()});
    
    for(let i=0; i<data.length;i++){
        
        let copyElement= originalElement.cloneNode(true);
        let element=data[i];
        let productImgUrl = element.picture;
        let price= formatter.format(element.price.amount);
       
        let city=element.location;
        let name = element.title;
        let info = copyElement.getElementsByClassName('info')[0];
        let productImg = copyElement.getElementsByClassName('productImg')[0];
        let line1 = info.getElementsByClassName('line1')[0];
        let nameElement = info.getElementsByClassName('name')[0];
        let priceElement = line1.getElementsByClassName('price')[0];
        let freeImg = line1.getElementsByClassName('freeImg')[0];
        let cityElement = line1.getElementsByClassName('city')[0];
        if(!data[i].free_shipping){
            line1.removeChild(freeImg);
        }
        productImg.setAttribute('src', productImgUrl);
        nameElement.innerHTML=name;
        priceElement.innerHTML=price;
        cityElement.innerHTML= city;
        copyElement.addEventListener("click",
        function() {
            showDetail(element.id,data);
        }
        );
        content.appendChild(copyElement);
    }
    content.removeChild(originalElement);
    let buscar = document.getElementById('lupaBtn');
    buscar.onclick=function(){
        let text = document.getElementById('searchField').value;
        filtrar(text,data);
    };
    
}
function showDetail(id,data){
    document.getElementById('content').style.visibility="hidden";
    document.getElementById('content').style.height="0px";
    document.getElementById('detail').style.visibility="visible";
    document.getElementById('detail').style.height="922px";
    document.getElementsByClassName('b-template')[0].style.visibility="hidden";
    let show;
    data.forEach(element => {
        if(element.id===id) {
         show = element;
        }
    });
    let det=document.getElementById('detail');
    let breadcrumb= det.getElementsByClassName('cat-list')[0];
    let detcont= det.getElementsByClassName('det-container')[0];
    let imgDetail=detcont.getElementsByClassName('imageDetail')[0];
    let descrip = detcont.getElementsByClassName('descrip')[0];
    let infoextra= detcont.getElementsByClassName('extraInfo')[0];
    let name = detcont.getElementsByClassName('detailName')[0];
    let price = detcont.getElementsByClassName('detailPrice')[0];
    let buyBtn=detcont.getElementsByClassName('buyBtn')[0];
    let favBtn = detcont.getElementsByClassName('favBtn')[0];

    imgDetail.setAttribute('src', show.picture);
    show.categories.forEach(element => {
        
        let copy=det.getElementsByClassName('b-template')[0].cloneNode(true);
        copy.innerHTML=element;
        copy.style.visibility="visible";
        breadcrumb.appendChild(copy);
    });
    buyBtn.addEventListener("click",
        function() {
            buy(show.title);
        }
        );
        favBtn.addEventListener("click",
        function() {
            addToFavs(show);
        }
        );
    descrip.innerHTML=show.description;
    infoextra.innerHTML=show.condition+"|"+show.sold_quantity+" vendidos.";
    name.innerHTML=show.title;
    price.innerHTML=formatter.format(show.price.amount);
}
function buy(){
    $('.toast').toast("show");
}
function addToFavs(element){
    favs.push(element);
}
function filtrar(input,data){
    let filter= new Array();
    data.forEach(element=>{
        element.categories.forEach(cat=>{
            if(cat===input) filter.push(element);
        });
    });
    document.getElementById('content').style.visibility="hidden";
    
    if(filter.length===0){
        $('.toastSearch').toast("show");
    }
    else{
        

        listado(filter);
    }
}



    fetch(fetchData)
  .then((data) => {return data.json()})
  .then(dataList => listado(dataList.items));