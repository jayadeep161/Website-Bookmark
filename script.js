const w_name=document.querySelector('.name');
const w_url=document.querySelector('.url');
const button=document.querySelector('button');
const dup=document.getElementById('dup');
button.addEventListener('click',save);

function save(e){
    console.log(localStorage)
    var bookmark={
        name:w_name.value,
        url:w_url.value
    }
    if (!validate(w_name.value,w_url.value)){
        return false;
    }

    if (localStorage.getItem('bookmarks')===null){
        var bookmarks=[];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }
    else{
        var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }
    dup.innerHTML='';
    fetchbookmarks();
    w_name.value='';
    w_url.value='';
    e.preventDefault();
}

function fetchbookmarks(){
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
       
            for(let i=0;i<bookmarks.length;i++){
                var n=bookmarks[i].name;
                var u=bookmarks[i].url;
                design(n,u);
            }
        
       
}

function validate(w_name,w_url){
    if (!w_name || !w_url){
        alert("please fill the form");
        return false;
    }
    var expression =/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!w_url.match(regex)){
        alert("enter proper URL");
        return false;
    }
    return true;
}

function design(name,url){
    const card=document.createElement('div');
    card.className='card';
    const cardbody=document.createElement('div');
    cardbody.className='card-body';
    card.appendChild(cardbody);
    const cardtitle=document.createElement('h3');
    cardtitle.className='card-title';
    cardtitle.className='text-center'
    cardtitle.appendChild(document.createTextNode(name));
    cardbody.appendChild(cardtitle);
    const link=document.createElement('a');
    link.href=url;
    link.target='_blank';
    var txt=document.createTextNode('visit');
    link.appendChild(txt);
    link.className='btn btn-success btn-sm col-6';
    cardbody.appendChild(link);
    const dlink=document.createElement('button');
    var txt1=document.createTextNode('delete');
    dlink.appendChild(txt1);
    dlink.className='btn btn-danger btn-sm col-6';
    cardbody.appendChild(dlink);
    dup.appendChild(card);
    dlink.addEventListener('click',remove);
    
}

function remove(e){
    var arr=JSON.parse(localStorage.getItem('bookmarks'));
    
    var h=e.target.previousElementSibling.previousElementSibling;
    
    for (let i=0;i<arr.length;i++){
        if (arr[i].name==h.innerHTML){
            arr.splice(i,1);   
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(arr));
    
    dup.innerHTML='';
    fetchbookmarks();
    

}
