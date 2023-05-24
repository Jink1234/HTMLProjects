class photogallery{
    constructor(){
        this.API_KEY="NGcPcsfmUmaDBESw2dhueDkVMC3NsuzDY7JzA8vi3AJ7IDwQyxrVQRW7";
        this.galleyDiv=document.querySelector('.gallery')
        this.searchForm=document.querySelector('.header form')
        this.loadMore=document.querySelector(".load-more")
        this.photogallery=document.querySelector(".logo")
        this.searchValueGlobal="";
        this.pageIndex=1;
        this.eventHandle();

    }


eventHandle=()=>{
    document.addEventListener("DOMContentLoaded",()=>{
        this.getImg(1);
    })
    
    this.searchForm.addEventListener("submit",(e)=>{
        this.getSearchedImages(e)
    })

    this.loadMore.addEventListener("click",(e)=>{
        this.loadMoreImages(e);
    })
    this.photogallery.addEventListener('click',()=>{
        this.pageIndex=1;
        this.galleyDiv.innerHTML=''
        this.getImg(this.pageIndex)
    })
    
}

async  getImg(index){
    this.loadMore.setAttribute('data-img','curated')
    const baseURL=`https://api.pexels.com/v1/curated?page=${index}&per_page=12`;
    const data = await this.fetchImages(baseURL);
    this.generateHTML(data.photos)
   
    console.log(data)
}

async fetchImages(baseURL){

    const response =await fetch(baseURL,{
        method:'GET',
        headers:{
            Accept:'application/json',
            Authorization:this.API_KEY
        }
    })
    const data = await response.json();
    return data;

}
generateHTML(photos){
    photos.forEach(photo=>{
        const item = document.createElement('div');
        item.classList.add('item')
        item.innerHTML=`
        <a href=${photo.src.original} target="_blank">
          <img src="${photo.src.medium}" alt=""/>
          <h3>${photo.photographer}<h3/>
        </a>
        `;
        this.galleyDiv.appendChild(item)
    })

}

async getSearchedImages(e){
    this.loadMore.setAttribute('data-img','search')
    e.preventDefault();
    this.pageIndex=1;
    this.galleyDiv.innerHTML=''
    const searchValue = e.target.querySelector('input').value;
    this.searchValueGlobal = searchValue;
    console.log(searchValue)
    const baseURL= `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12`;
    const data = await this.fetchImages(baseURL);
    this.generateHTML(data.photos);
    e.target.reset();
}

async getMoreSearchedImages(index){
    const baseURL= `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=12`;
    const data = await this.fetchImages(baseURL);
    console.log(data)
    this.generateHTML(data.photos)
}

loadMoreImages(e){
     let loadmorindex=++this.pageIndex;
     console.log(loadmorindex)

    const loadMoreData = e.target.getAttribute('data-img');
    console.log(loadMoreData);
    if(loadMoreData === 'curated'){
        this.getImg(loadmorindex);
    }else{
       this.getMoreSearchedImages(loadmorindex)

    }


}

}

const gallery = new photogallery;