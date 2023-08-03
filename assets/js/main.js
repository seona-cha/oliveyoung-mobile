// 스크롤시 헤더, 메뉴 컨트롤

let lastScroll = 0;

$(window).scroll(function(){
    curr = $(window).scrollTop();

    if(curr < lastScroll){
        $('.header').addClass('on');
        $('.fixed-menu').addClass('on');
    } else if (curr > 43 && curr >= lastScroll) {
        $('.header').removeClass('on');
        $('.fixed-menu').removeClass('on');
    }

    if(curr == 0){
        $('#topBtn').removeClass('on');
    }else{
        $('#topBtn').addClass('on');
    }

    lastScroll = curr;
})
// 맨위로 버튼
$('#topBtn a').click(function(a){
    a.preventDefault();
    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
})

// 메인 슬라이더
fetch('./assets/data/mainSlider.json')
    .then(res=>res.json())
    .then(json=>{
        data=json.items;
        let html=``;

        data.forEach(element => {
            html+=`
            <div class="swiper-slide">
                <a href="${element.linkUrl}">
                    <figure class="img-box">
                        <img src="${element.thumbUrl}" alt="${element.thumbAlt}">
                    </figure>
                    <div class="text-box ${element.theme}">
                        <h3>${element.title}</h3>
                        <p>${element.desc}</p>
                    </div>
                </a>
            </div>
            `
            $(`.sc-main-slider .swiper-wrapper`).html(html)
        });
        
        const mainSlider = new Swiper("#mainSlider",{
            loop:true,
            effect:"fade",
            autoplay:{
                delay:4000,
                disableOnInteraction: false        
            },
            pagination:{
                el:".sc-main-slider .pagination",
                type: "fraction"
            }
        })
    })

// 혜택 배너 
fetch(`./assets/data/banner.json`)
.then(res=>res.json())
.then(json =>{
    data = json.items;

    html=``;

    data.forEach(element=>{
        html+=`
        <li class="swiper-slide">
            <a href="${element.linkUrl}"><img src="${element.thumbUrl}" alt="${element.title}"></a>
        </li>
        `
    })
    $(`.sc-banner .swiper-wrapper`).html(html)
    const bannerSlider = new Swiper("#bannerSlider",{
        loop:true,
        pagination:{
            el:".sc-banner .pagination"
        }
    })
})

// 고객님을 위한 추천 상품
fetch(`./assets/data/product.json`)
    .then(res=>res.json())
    .then(json =>{
        data = json.items;
        html=``;

        let i = 0;
        while(i < 15) {
            element = data[i];
            
            salePercent = (( element.cost - element.sale ) / element.cost)*100 ;

            html+=`
            <li class="prd-item swiper-slide">
                <a href="${element.linkUrl}"></a>
                <figure class="img-box">
                    <img src="${element.thumbUrl}" alt>
                </figure>
                <div class="text-box">
                    <p class="prd-name">
                    `
                    if(element.best){
                        html+=`<em class="best">BEST</em>`
                    }
                    html+=`
                    ${element.productName}
                    </p>
                    <div class="info-wrap">
                        <p class="price">`
                        if(element.cost){
                            html+=`<del class="cost">${element.cost.toLocaleString()}<span>원</span></del><em class="sale-per">${salePercent.toFixed()}</em>`
                        }   
                        html+=`
                            <em class="sale">${element.sale.toLocaleString()}<span>원</span></em>
                        </p>
            `

            if(element.tag){
                html+=`<p class="tag">`;

                prdTag = element.tag;
                prdTag.forEach(element=>{
                    if(element == '증정'){
                        html+=`<span class="gift">${element}</span>`
                    }
                    if(element == '오늘드림'){
                        html+=`<span class="today">${element}</span>`
                    }
                })
                
                html+=`</p>`;
            }

            html+=`
                    </div>
                    <div class="btn-wrap">
                        <button href="#" class="like"><span class="blind">찜</span><svg viewBox="0 0 32 32"><path d="M22.997 2.6c-1.898 0-3.705.615-5.189 1.734l-.276.247c-.454.423-.878.897-1.277 1.428l-.252.346-.074-.106c-.495-.697-1.024-1.297-1.587-1.798C12.789 3.244 10.944 2.6 9.003 2.6c-4.766 0-8.63 3.864-8.63 8.63 0 1.687.485 3.304 1.383 4.69.58 1.068 1.384 2.243 2.413 3.526l.49.599c.085.101.17.203.258.305l.539.622.28.317.587.645c.201.217.407.437.618.66l.65.675.337.343.698.698.361.354.745.72.778.736.809.75.84.766c.143.13.287.259.433.389l.888.788.92.804.952.819c.373.318.923.318 1.296 0l.952-.819.92-.804.888-.788.857-.774.825-.758.794-.744.384-.366.747-.722.714-.706.345-.348.667-.684.636-.67.603-.654c.196-.216.387-.43.572-.64l.541-.626c1.4-1.648 2.463-3.14 3.19-4.48.859-1.319 1.345-2.936 1.345-4.622 0-4.767-3.865-8.631-8.631-8.631zm0 1.995c3.665 0 6.636 2.97 6.636 6.636 0 1.298-.373 2.539-1.064 3.604l-.133.239c-1.198 2.111-3.292 4.655-6.283 7.634l-.736.723-.77.74-.804.756-.415.385-.856.781-.44.397-.909.807L16 28.36l-.28-.241c-.313-.27-.619-.538-.92-.802l-.886-.787c-.29-.26-.574-.516-.853-.77l-.82-.755-.397-.371-.771-.73-.738-.715c-.601-.588-1.168-1.16-1.7-1.715l-.623-.657c-.303-.325-.594-.644-.872-.956l-.54-.617C5.204 17.62 4.16 16.172 3.47 14.9c-.73-1.131-1.103-2.372-1.103-3.67 0-3.665 2.971-6.636 6.636-6.636 1.494 0 2.91.494 4.064 1.39.704.628 1.409 1.556 2.057 2.745.378.692 1.37.694 1.75.004.674-1.225 1.405-2.173 2.187-2.85 1.089-.817 2.475-1.289 3.936-1.289z"></path></svg></button>

                        <button href="#" class="cart"><span class="blind">장바구니</span><svg viewBox="0 0 22 22"><path d="M7.04553 6.46797H4.67141L3.18318 19.2667H18.8161L17.3278 6.46797H14.9537V7.46903C14.9537 7.96608 14.5507 8.36903 14.0537 8.36903C13.5566 8.36903 13.1537 7.96608 13.1537 7.46903V6.46797H8.84553V7.46903C8.84553 7.96608 8.44259 8.36903 7.94553 8.36903C7.44848 8.36903 7.04553 7.96608 7.04553 7.46903V6.46797ZM8.88096 4.66797H13.1471C13.0865 3.69216 12.6238 3.26091 12.2056 3.02945C11.9553 2.8909 11.6958 2.81427 11.4928 2.77341C11.3932 2.75336 11.3124 2.74296 11.2603 2.73771C11.2365 2.73532 11.2191 2.73403 11.209 2.7334C10.5217 2.73655 10.0751 2.9017 9.77764 3.09758C9.47353 3.29782 9.2668 3.56888 9.12384 3.86489C8.98938 4.14331 8.91771 4.43172 8.88096 4.66797ZM14.9494 4.66797H18.1293C18.5861 4.66797 18.9705 5.01023 19.0232 5.46402L20.7208 20.0628C20.7504 20.3179 20.6697 20.5735 20.4989 20.7653C20.3282 20.957 20.0836 21.0667 19.8268 21.0667H2.17247C1.91567 21.0667 1.6711 20.957 1.50032 20.7653C1.32955 20.5735 1.24883 20.3179 1.27849 20.0628L2.97602 5.46402C3.02879 5.01023 3.41316 4.66797 3.87 4.66797H7.06716C7.07299 4.60895 7.08033 4.54552 7.08959 4.47831C7.14044 4.10899 7.25218 3.60137 7.50298 3.08208C7.75607 2.55803 8.15777 2.00902 8.78776 1.5942C9.42149 1.17693 10.2289 0.93335 11.2291 0.93335L11.2517 0.933635L11.2291 1.83335C11.2517 0.933635 11.2522 0.933647 11.2527 0.93366L11.2537 0.933688L11.256 0.933752L11.2613 0.93392L11.2751 0.934447C11.2858 0.934895 11.2991 0.935553 11.3151 0.936516C11.3469 0.938441 11.3893 0.941597 11.4406 0.946764C11.5429 0.957069 11.6828 0.975547 11.848 1.0088C12.1747 1.07456 12.6214 1.20227 13.0773 1.45458C14.0021 1.96644 14.8798 2.95361 14.9494 4.66797Z"></path></svg></button>
                    </div>
                </div>
            </li>
            `
                    
            i++; 
        }
        html+=`
            <li class="swiper-slide link-more2">
                <button class="more-btn">
                <svg viewBox="0 0 32 32"><path d="m17.822 5 11.51 11.336-11.51 11.337-1.404-1.425 9.05-8.915H2.668v-2h22.796l-9.045-8.908L17.822 5z"></path></svg>
                더보기
                </button>
            </li>
        `
        
        $(`.sc-recomm .prd-list`).html(html)
        
        const recommScroll = new Swiper("#recommSlider",{
            slidesPerView:"auto",
            freeMode: true,
            spaceBetween: 10
        })
    })

// 카테고리 랭킹 

// 카테고리 랭킹 - 탭 불러오기
fetch('./assets/data/category.json')
    .then(res=>res.json())
    .then(json=>{
        data=json.items;
        html=``;

        for(i=0;i<6;i++){
            element = data[i]
            html+=`
            <li class="tab-item swiper-slide">
                ${element.name}
            </li>
            `
        }
        $(`.sc-cate-ranking .tab-list`).html(html)

       
        // 카테고리 랭킹 - 리스트 불러오기
        fetch('./assets/data/product.json')
            .then(res=>res.json())
            .then(json=>{
                data = json.items;
                html2 = ``;

                for(i=0;i<5;i++){

                    html2+=`
                    <div class="swiper-slide">
                        <ul class="prd-list prd-list02">
                    `
                    let j = 0;
                    while(j < 5) {
                        element = data[j];
                        
                        salePercent = (( element.cost - element.sale ) / element.cost)*100 ;
            
                        html2+=`
                        <li class="prd-item ranking">
                            <a href="${element.linkUrl}"></a>
                            <figure class="img-box">
                                <img src="${element.thumbUrl}" alt>
                            </figure>
                            <div class="text-box">
                                <div class="info-wrap">
                                    <p class="prd-name">
                                    `
                                    if(element.best){
                                        html2+=`<em class="best">BEST</em>`
                                    }
                                    html2+=`
                                    ${element.productName}
                                    </p>
                                    `
                                    if(element.cost){
                                        html2+=`
                                    <p class="price">
                                        <em class="sale-per">${salePercent.toFixed()}</em>
                                        <span class="sale">${element.sale.toLocaleString()}<span>원</span></span>
                                        <del class="cost">${element.cost.toLocaleString()}<span>원</span></del>
                                    </p>
                                    `
                                    }else{
                                    html2+=`
                                    <p class="price">
                                        <span class="sale">${element.sale.toLocaleString()}<span>원</span></span>
                                    </p>
                                    `
                                    }
            
                        if(element.tag){
                            html2+=`<p class="tag">`;
            
                            prdTag = element.tag;
                            prdTag.forEach(element=>{
                                if(element == '증정'){
                                    html2+=`<span class="gift">${element}</span>`
                                }
                                if(element == '오늘드림'){
                                    html2+=`<span class="today">${element}</span>`
                                }
                            })
                            
                            html2+=`</p>`;
                        }
            
                        html2+=`
                                </div>
                                <div class="btn-wrap">
                                    <button href="#" class="like"><span class="blind">찜</span><svg viewBox="0 0 32 32"><path d="M22.997 2.6c-1.898 0-3.705.615-5.189 1.734l-.276.247c-.454.423-.878.897-1.277 1.428l-.252.346-.074-.106c-.495-.697-1.024-1.297-1.587-1.798C12.789 3.244 10.944 2.6 9.003 2.6c-4.766 0-8.63 3.864-8.63 8.63 0 1.687.485 3.304 1.383 4.69.58 1.068 1.384 2.243 2.413 3.526l.49.599c.085.101.17.203.258.305l.539.622.28.317.587.645c.201.217.407.437.618.66l.65.675.337.343.698.698.361.354.745.72.778.736.809.75.84.766c.143.13.287.259.433.389l.888.788.92.804.952.819c.373.318.923.318 1.296 0l.952-.819.92-.804.888-.788.857-.774.825-.758.794-.744.384-.366.747-.722.714-.706.345-.348.667-.684.636-.67.603-.654c.196-.216.387-.43.572-.64l.541-.626c1.4-1.648 2.463-3.14 3.19-4.48.859-1.319 1.345-2.936 1.345-4.622 0-4.767-3.865-8.631-8.631-8.631zm0 1.995c3.665 0 6.636 2.97 6.636 6.636 0 1.298-.373 2.539-1.064 3.604l-.133.239c-1.198 2.111-3.292 4.655-6.283 7.634l-.736.723-.77.74-.804.756-.415.385-.856.781-.44.397-.909.807L16 28.36l-.28-.241c-.313-.27-.619-.538-.92-.802l-.886-.787c-.29-.26-.574-.516-.853-.77l-.82-.755-.397-.371-.771-.73-.738-.715c-.601-.588-1.168-1.16-1.7-1.715l-.623-.657c-.303-.325-.594-.644-.872-.956l-.54-.617C5.204 17.62 4.16 16.172 3.47 14.9c-.73-1.131-1.103-2.372-1.103-3.67 0-3.665 2.971-6.636 6.636-6.636 1.494 0 2.91.494 4.064 1.39.704.628 1.409 1.556 2.057 2.745.378.692 1.37.694 1.75.004.674-1.225 1.405-2.173 2.187-2.85 1.089-.817 2.475-1.289 3.936-1.289z"></path></svg></button>
    
                                    <button href="#" class="cart"><span class="blind">장바구니</span><svg viewBox="0 0 22 22"><path d="M7.04553 6.46797H4.67141L3.18318 19.2667H18.8161L17.3278 6.46797H14.9537V7.46903C14.9537 7.96608 14.5507 8.36903 14.0537 8.36903C13.5566 8.36903 13.1537 7.96608 13.1537 7.46903V6.46797H8.84553V7.46903C8.84553 7.96608 8.44259 8.36903 7.94553 8.36903C7.44848 8.36903 7.04553 7.96608 7.04553 7.46903V6.46797ZM8.88096 4.66797H13.1471C13.0865 3.69216 12.6238 3.26091 12.2056 3.02945C11.9553 2.8909 11.6958 2.81427 11.4928 2.77341C11.3932 2.75336 11.3124 2.74296 11.2603 2.73771C11.2365 2.73532 11.2191 2.73403 11.209 2.7334C10.5217 2.73655 10.0751 2.9017 9.77764 3.09758C9.47353 3.29782 9.2668 3.56888 9.12384 3.86489C8.98938 4.14331 8.91771 4.43172 8.88096 4.66797ZM14.9494 4.66797H18.1293C18.5861 4.66797 18.9705 5.01023 19.0232 5.46402L20.7208 20.0628C20.7504 20.3179 20.6697 20.5735 20.4989 20.7653C20.3282 20.957 20.0836 21.0667 19.8268 21.0667H2.17247C1.91567 21.0667 1.6711 20.957 1.50032 20.7653C1.32955 20.5735 1.24883 20.3179 1.27849 20.0628L2.97602 5.46402C3.02879 5.01023 3.41316 4.66797 3.87 4.66797H7.06716C7.07299 4.60895 7.08033 4.54552 7.08959 4.47831C7.14044 4.10899 7.25218 3.60137 7.50298 3.08208C7.75607 2.55803 8.15777 2.00902 8.78776 1.5942C9.42149 1.17693 10.2289 0.93335 11.2291 0.93335L11.2517 0.933635L11.2291 1.83335C11.2517 0.933635 11.2522 0.933647 11.2527 0.93366L11.2537 0.933688L11.256 0.933752L11.2613 0.93392L11.2751 0.934447C11.2858 0.934895 11.2991 0.935553 11.3151 0.936516C11.3469 0.938441 11.3893 0.941597 11.4406 0.946764C11.5429 0.957069 11.6828 0.975547 11.848 1.0088C12.1747 1.07456 12.6214 1.20227 13.0773 1.45458C14.0021 1.96644 14.8798 2.95361 14.9494 4.66797Z"></path></svg></button>
                                </div>
                            </div>
                        </li>
                        `
                        j++; 
                    }
                    html2+=`
                    </ul>
                </div> 
                    `
                }
                $(`#cateRankingSlider .swiper-wrapper`).html(html2)
        
        
            //카테고리 랭킹 슬라이더
            const cateRankingTab = new Swiper("#cateRankingTab",{
                slidesPerView:"auto",
                freeMode: true,
                spaceBetween: 8
            })
            const cateRankingSlider = new Swiper("#cateRankingSlider",{
                loop:true,
                navigation:{
                    nextEl:".sc-cate-ranking .next",
                    prevEl:".sc-cate-ranking .prev"
                },
                pagination:{
                    el:".sc-cate-ranking .pagination",
                    type: "fraction"
                },
                thumbs: {
                    swiper: cateRankingTab,
                }
            })
        })

    })

// Weekly Special
fetch('./assets/data/weekly.json')
    .then(res=>res.json())
    .then(json=>{
        data = json.items;
        
        html=``;
        data.forEach(element =>{
            html+=`
            <li class="weekly-item ${element.theme}">
                <a href="${element.linkUrl}">
                    <figure class="img-box"><img src="${element.thumbUrl}" alt></figure>
                    <div class="text-box">
                        <h3>${element.title[0]}<br>${element.title[1]}</h3>
                        <p>${element.desc}</p>
                    </div>
                </a>
            </li> 
            `
        })
        $('.sc-weekly .weekly-list').html(html);
    })

// 이벤트 리스트 불러오기
fetch('./assets/data/event.json')
    .then(res=>res.json())
    .then(json=>{
        data = json.items;


        // 이벤트 탭
        tabList=``;
        data.forEach(element=>{
            tabList+=`
            <li class="tab-item swiper-slide">
                ${element.eventName}
            </li> 
            `
        })

        $('.sc-event .tab-list').html(tabList);
        // 이벤트 정보 
        html=``;

        data.forEach(element =>{
            html+=`
            <div class="swiper-slide">

                <div class="group-head">
                    <a href="${element.linkUrl}">
                        <div class="bg-box">
                            <img src="${element.backgroundUrl}" alt>
                        </div>
                        <div class="text-box ${element.theme}">
                            <h3>${element.title[0]}<br>${element.title[1]}</h3>
                            <p>${element.subTitle}</p>
                        </div>
                    </a>
                </div>

                <ul class="prd-list prd-list02 event${element.id}">
                        
                </ul>
                </div>
            `
           
        })

    // 이벤트 상품 불러오기 
    fetch('./assets/data/product.json')
        .then(res=>res.json())
        .then(json=>{
            data = json.items;
            function sortData(sortId){
                // 이벤트 ID값이 일치하는 상품 필터링
                eventData = data.filter(function(parm){
                    return parm.eventId === sortId;
                })

                let html2=``;

                eventData.forEach(element=>{
                    salePercent = (( element.cost - element.sale ) / element.cost)*100 ;
        
                    html2+=`
                    <li class="prd-item">
                        <a href="${element.linkUrl}"></a>
                        <figure class="img-box">
                            <img src="${element.thumbUrl}" alt>
                        </figure>
                        <div class="text-box">
                            <div class="info-wrap">
                                <p class="prd-name">
                                `
                                if(element.best){
                                    html2+=`<em class="best">BEST</em>`
                                }
                                html2+=`
                                ${element.productName}
                                </p>
                                `
                                if(element.cost){
                                    html2+=`
                                <p class="price">
                                    <em class="sale-per">${salePercent.toFixed()}</em>
                                    <span class="sale">${element.sale.toLocaleString()}<span>원</span></span>
                                    <del class="cost">${element.cost.toLocaleString()}<span>원</span></del>
                                </p>
                                `
                                }else{
                                html2+=`
                                <p class="price">
                                    <span class="sale">${element.sale.toLocaleString()}<span>원</span></span>
                                </p>
                                `
                                }
        
                    if(element.tag){
                        html2+=`<p class="tag">`;
        
                        prdTag = element.tag;
                        prdTag.forEach(element=>{
                            if(element == '증정'){
                                html2+=`<span class="gift">${element}</span>`
                            }
                            if(element == '오늘드림'){
                                html2+=`<span class="today">${element}</span>`
                            }
                        })
                        
                        html2+=`</p>`;
                    }
        
                    html2+=`
                            </div>
                            <div class="btn-wrap">
                                <button href="#" class="like"><span class="blind">찜</span><svg viewBox="0 0 32 32"><path d="M22.997 2.6c-1.898 0-3.705.615-5.189 1.734l-.276.247c-.454.423-.878.897-1.277 1.428l-.252.346-.074-.106c-.495-.697-1.024-1.297-1.587-1.798C12.789 3.244 10.944 2.6 9.003 2.6c-4.766 0-8.63 3.864-8.63 8.63 0 1.687.485 3.304 1.383 4.69.58 1.068 1.384 2.243 2.413 3.526l.49.599c.085.101.17.203.258.305l.539.622.28.317.587.645c.201.217.407.437.618.66l.65.675.337.343.698.698.361.354.745.72.778.736.809.75.84.766c.143.13.287.259.433.389l.888.788.92.804.952.819c.373.318.923.318 1.296 0l.952-.819.92-.804.888-.788.857-.774.825-.758.794-.744.384-.366.747-.722.714-.706.345-.348.667-.684.636-.67.603-.654c.196-.216.387-.43.572-.64l.541-.626c1.4-1.648 2.463-3.14 3.19-4.48.859-1.319 1.345-2.936 1.345-4.622 0-4.767-3.865-8.631-8.631-8.631zm0 1.995c3.665 0 6.636 2.97 6.636 6.636 0 1.298-.373 2.539-1.064 3.604l-.133.239c-1.198 2.111-3.292 4.655-6.283 7.634l-.736.723-.77.74-.804.756-.415.385-.856.781-.44.397-.909.807L16 28.36l-.28-.241c-.313-.27-.619-.538-.92-.802l-.886-.787c-.29-.26-.574-.516-.853-.77l-.82-.755-.397-.371-.771-.73-.738-.715c-.601-.588-1.168-1.16-1.7-1.715l-.623-.657c-.303-.325-.594-.644-.872-.956l-.54-.617C5.204 17.62 4.16 16.172 3.47 14.9c-.73-1.131-1.103-2.372-1.103-3.67 0-3.665 2.971-6.636 6.636-6.636 1.494 0 2.91.494 4.064 1.39.704.628 1.409 1.556 2.057 2.745.378.692 1.37.694 1.75.004.674-1.225 1.405-2.173 2.187-2.85 1.089-.817 2.475-1.289 3.936-1.289z"></path></svg></button>

                                <button href="#" class="cart"><span class="blind">장바구니</span><svg viewBox="0 0 22 22"><path d="M7.04553 6.46797H4.67141L3.18318 19.2667H18.8161L17.3278 6.46797H14.9537V7.46903C14.9537 7.96608 14.5507 8.36903 14.0537 8.36903C13.5566 8.36903 13.1537 7.96608 13.1537 7.46903V6.46797H8.84553V7.46903C8.84553 7.96608 8.44259 8.36903 7.94553 8.36903C7.44848 8.36903 7.04553 7.96608 7.04553 7.46903V6.46797ZM8.88096 4.66797H13.1471C13.0865 3.69216 12.6238 3.26091 12.2056 3.02945C11.9553 2.8909 11.6958 2.81427 11.4928 2.77341C11.3932 2.75336 11.3124 2.74296 11.2603 2.73771C11.2365 2.73532 11.2191 2.73403 11.209 2.7334C10.5217 2.73655 10.0751 2.9017 9.77764 3.09758C9.47353 3.29782 9.2668 3.56888 9.12384 3.86489C8.98938 4.14331 8.91771 4.43172 8.88096 4.66797ZM14.9494 4.66797H18.1293C18.5861 4.66797 18.9705 5.01023 19.0232 5.46402L20.7208 20.0628C20.7504 20.3179 20.6697 20.5735 20.4989 20.7653C20.3282 20.957 20.0836 21.0667 19.8268 21.0667H2.17247C1.91567 21.0667 1.6711 20.957 1.50032 20.7653C1.32955 20.5735 1.24883 20.3179 1.27849 20.0628L2.97602 5.46402C3.02879 5.01023 3.41316 4.66797 3.87 4.66797H7.06716C7.07299 4.60895 7.08033 4.54552 7.08959 4.47831C7.14044 4.10899 7.25218 3.60137 7.50298 3.08208C7.75607 2.55803 8.15777 2.00902 8.78776 1.5942C9.42149 1.17693 10.2289 0.93335 11.2291 0.93335L11.2517 0.933635L11.2291 1.83335C11.2517 0.933635 11.2522 0.933647 11.2527 0.93366L11.2537 0.933688L11.256 0.933752L11.2613 0.93392L11.2751 0.934447C11.2858 0.934895 11.2991 0.935553 11.3151 0.936516C11.3469 0.938441 11.3893 0.941597 11.4406 0.946764C11.5429 0.957069 11.6828 0.975547 11.848 1.0088C12.1747 1.07456 12.6214 1.20227 13.0773 1.45458C14.0021 1.96644 14.8798 2.95361 14.9494 4.66797Z"></path></svg></button>
                            </div>
                        </div>
                    </li>
                    `
                })
                $(`.sc-event .event${sortId}`).html(html2)
            }
            sortData(1);
            sortData(2);
            sortData(3);
        })
        
    html+=`
    `
    
    $('.sc-event .swiper .swiper-wrapper').html(html);
    // 이벤트 슬라이더
    const eventTab = new Swiper(".sc-event .swiper-tab",{
        slidesPerView:"auto",
        spaceBetween:8,
        freeMode:true
    })
    const eventSlider = new Swiper(".sc-event .swiper",{
        loop:true,
        navigation:{
            nextEl:".sc-event .next",
            prevEl:".sc-event .prev"
        },
        pagination:{
            el:".sc-event .pagination",
            type: "fraction"
        },
        thumbs: {
            swiper: eventTab,
        }
    })
})


// 디저트에서 이 상품은 어떤가요?
fetch('./assets/data/product.json')
.then(res=>res.json())
.then(json=>{
    data = json.items;
    html = ``;

    let i = 4;
    while(i < 16) {
        element = data[i];
        
        salePercent = (( element.cost - element.sale ) / element.cost)*100 ;

        html+=`
        <li class="swiper-slide prd-item">
            <a href="${element.linkUrl}"></a>
            <figure class="img-box">
                <img src="${element.thumbUrl}" alt>
            </figure>
            <div class="text-box">
                <p class="prd-name">
                `
                if(element.best){
                    html+=`<em class="best">BEST</em>`
                }
                html+=`
                ${element.productName}
                </p>
                <div class="info-wrap">
                    <p class="price">`
                    if(element.cost){
                        html+=`<em class="sale-per">${salePercent.toFixed()}</em>`
                    }   
                    html+=`
                        <span class="sale">${element.sale.toLocaleString()}<span>원</span></span>
                    </p>
                `

        if(element.tag){
            html+=`<p class="tag">`;

            prdTag = element.tag;
            prdTag.forEach(element=>{
                if(element == '증정'){
                    html+=`<span class="gift">${element}</span>`
                }
                if(element == '오늘드림'){
                    html+=`<span class="today">${element}</span>`
                }
            })
            
            html+=`</p>`;
        }

        html+=`
                </div>
            </div>
        </li>
        `
        i++; 
    }
    
    $(`.sc-dessert .prd-list`).html(html)
    const dessertSlider = new Swiper("#dessertSlider",{
        slidesPerView:3,
        slidesPerGroup:3,
        spaceBetween:8,
        grid:{
            rows:2
        },
        pagination:{
            el:".sc-dessert .pagination"
        },
    })
})

// 키워드

current3 = 1;
function keywords(i,j){
    fetch('./assets/data/keywords.json')
        .then(res=>res.json())
        .then(json=>{
            data=json.items;
            html=``;

            while(i < j){
                element = data[i];
                
                html+=`
                <li class="keyword-item">
                    <a href="${element.linkUrl}">
                        <figure class="img-box">
                            <img src="${element.thumbUrl}" alt">
                        </figure>
                        <div class="text-box">
                            <h3>${element.title}</h3>
                            <p>${element.subTitle}</p>
                        </div>
                    </a>
                </li> 
                `
    
                i++;
            }
            $('.sc-keyword .keyword-list').html(html);
        });
}
        
keywords(0,2);
$('.sc-keyword .other-btn').click(function(){
    if(current3 == 1 ){
        keywords(2,4);
        current3 = 2;
    }else if(current3 == 2){
        keywords(4,6);
        current3 = 3;
    }else{
        keywords(0,2);
        current3 = 1;
    }
    $('.sc-keyword .other-btn .current').html(current3);
})         
// 오직 올리브영에서만
fetch('./assets/data/slideBanner.json')
    .then(res=>res.json())
    .then(json=>{
        data=json.items;
        html=``
        data.forEach(element=>{
            html+=`
            <div class="swiper-slide">
                <a href="${element.linkUrl}">
                    <div class="img-box">
                        <img src="${element.thumbUrl}" alt="">
                    </div>
                    <div class="text-box ${element.theme}">
                        <h3>${element.title[0]}<br>${element.title[1]}</h3>
                        <p>${element.desc}</p>
                    </div>
                </a>
            </div>
            `
        })
        $('.sc-only .swiper-wrapper').html(html);
        // 오직 올리브영에서만 슬라이더
        const bannerSlider = new Swiper(".sc-only .swiper",{
            spaceBetween:15,
            grid: {
                rows:3,
            },
            pagination:{
                el:".sc-only .pagination"
            }
        })
    })
// MD가 추천해요
fetch('./assets/data/product.json')
    .then(res=>res.json())
    .then(json=>{
        data = json.items;
        html = ``;
        let i = 5;
        while(i < 7) {
            element = data[i];
            
            salePercent = (( element.cost - element.sale ) / element.cost)*100 ;

            html+=`
            <li class="prd-item ranking">
                <a href="${element.linkUrl}"></a>
                <figure class="img-box">
                    <img src="${element.thumbUrl}" alt>
                </figure>
                <div class="text-box">
                    <div class="info-wrap">
                        <p class="prd-name">
                        `
                        if(element.best){
                            html+=`<em class="best">BEST</em>`
                        }
                        html+=`
                        ${element.productName}
                        </p>
                        <p class="price">`
                        if(element.cost){
                            html+=`<del class="cost">${element.cost.toLocaleString()}<span>원</span></del><em class="sale-per">${salePercent.toFixed()}</em>`
                        }   
                        html+=`
                            <em class="sale">${element.sale.toLocaleString()}<span>원</span></em>
                        </p>`

            if(element.tag){
                html+=`<p class="tag">`;

                prdTag = element.tag;
                prdTag.forEach(element=>{
                    if(element == '증정'){
                        html+=`<span class="gift">${element}</span>`
                    }
                    if(element == '오늘드림'){
                        html+=`<span class="today">${element}</span>`
                    }
                })
                
                html+=`</p>`;
            }

            html+=`
                    </div>
                    <div class="btn-wrap">
                        <button href="#" class="like"><span class="blind">찜</span><svg viewBox="0 0 32 32"><path d="M22.997 2.6c-1.898 0-3.705.615-5.189 1.734l-.276.247c-.454.423-.878.897-1.277 1.428l-.252.346-.074-.106c-.495-.697-1.024-1.297-1.587-1.798C12.789 3.244 10.944 2.6 9.003 2.6c-4.766 0-8.63 3.864-8.63 8.63 0 1.687.485 3.304 1.383 4.69.58 1.068 1.384 2.243 2.413 3.526l.49.599c.085.101.17.203.258.305l.539.622.28.317.587.645c.201.217.407.437.618.66l.65.675.337.343.698.698.361.354.745.72.778.736.809.75.84.766c.143.13.287.259.433.389l.888.788.92.804.952.819c.373.318.923.318 1.296 0l.952-.819.92-.804.888-.788.857-.774.825-.758.794-.744.384-.366.747-.722.714-.706.345-.348.667-.684.636-.67.603-.654c.196-.216.387-.43.572-.64l.541-.626c1.4-1.648 2.463-3.14 3.19-4.48.859-1.319 1.345-2.936 1.345-4.622 0-4.767-3.865-8.631-8.631-8.631zm0 1.995c3.665 0 6.636 2.97 6.636 6.636 0 1.298-.373 2.539-1.064 3.604l-.133.239c-1.198 2.111-3.292 4.655-6.283 7.634l-.736.723-.77.74-.804.756-.415.385-.856.781-.44.397-.909.807L16 28.36l-.28-.241c-.313-.27-.619-.538-.92-.802l-.886-.787c-.29-.26-.574-.516-.853-.77l-.82-.755-.397-.371-.771-.73-.738-.715c-.601-.588-1.168-1.16-1.7-1.715l-.623-.657c-.303-.325-.594-.644-.872-.956l-.54-.617C5.204 17.62 4.16 16.172 3.47 14.9c-.73-1.131-1.103-2.372-1.103-3.67 0-3.665 2.971-6.636 6.636-6.636 1.494 0 2.91.494 4.064 1.39.704.628 1.409 1.556 2.057 2.745.378.692 1.37.694 1.75.004.674-1.225 1.405-2.173 2.187-2.85 1.089-.817 2.475-1.289 3.936-1.289z"></path></svg></button>
                        
                        <button class="cart"><span class="blind">장바구니</span><svg viewBox="0 0 22 22"><path d="M7.04553 6.46797H4.67141L3.18318 19.2667H18.8161L17.3278 6.46797H14.9537V7.46903C14.9537 7.96608 14.5507 8.36903 14.0537 8.36903C13.5566 8.36903 13.1537 7.96608 13.1537 7.46903V6.46797H8.84553V7.46903C8.84553 7.96608 8.44259 8.36903 7.94553 8.36903C7.44848 8.36903 7.04553 7.96608 7.04553 7.46903V6.46797ZM8.88096 4.66797H13.1471C13.0865 3.69216 12.6238 3.26091 12.2056 3.02945C11.9553 2.8909 11.6958 2.81427 11.4928 2.77341C11.3932 2.75336 11.3124 2.74296 11.2603 2.73771C11.2365 2.73532 11.2191 2.73403 11.209 2.7334C10.5217 2.73655 10.0751 2.9017 9.77764 3.09758C9.47353 3.29782 9.2668 3.56888 9.12384 3.86489C8.98938 4.14331 8.91771 4.43172 8.88096 4.66797ZM14.9494 4.66797H18.1293C18.5861 4.66797 18.9705 5.01023 19.0232 5.46402L20.7208 20.0628C20.7504 20.3179 20.6697 20.5735 20.4989 20.7653C20.3282 20.957 20.0836 21.0667 19.8268 21.0667H2.17247C1.91567 21.0667 1.6711 20.957 1.50032 20.7653C1.32955 20.5735 1.24883 20.3179 1.27849 20.0628L2.97602 5.46402C3.02879 5.01023 3.41316 4.66797 3.87 4.66797H7.06716C7.07299 4.60895 7.08033 4.54552 7.08959 4.47831C7.14044 4.10899 7.25218 3.60137 7.50298 3.08208C7.75607 2.55803 8.15777 2.00902 8.78776 1.5942C9.42149 1.17693 10.2289 0.93335 11.2291 0.93335L11.2517 0.933635L11.2291 1.83335C11.2517 0.933635 11.2522 0.933647 11.2527 0.93366L11.2537 0.933688L11.256 0.933752L11.2613 0.93392L11.2751 0.934447C11.2858 0.934895 11.2991 0.935553 11.3151 0.936516C11.3469 0.938441 11.3893 0.941597 11.4406 0.946764C11.5429 0.957069 11.6828 0.975547 11.848 1.0088C12.1747 1.07456 12.6214 1.20227 13.0773 1.45458C14.0021 1.96644 14.8798 2.95361 14.9494 4.66797Z"></path></svg></button>
                    </div>
                </div>
            </li>
            `
            i++; 
        }
        
        $(`.sc-md .prd-list`).html(html)
    
    
    })

// 이 상품 어때요? 상품 리스트 불러오기
fetch(`./assets/data/product.json`)
    .then(res=>res.json())
    .then(json =>{
        data = json.items;
        function prdList(i,j,list){
            html = ``;
            while(i < j) {
                element = data[i];
                
                salePercent = (( element.cost - element.sale ) / element.cost)*100 ;
    
                html+=`
                <li class="prd-item">
                    <a href="${element.linkUrl}"></a>
                    <figure class="img-box">
                        <img src="${element.thumbUrl}" alt>
                    </figure>
                    <div class="text-box">
                        <div class="info-wrap">
                            <p class="prd-name">
                            `
                            if(element.best){
                                html+=`<em class="best">BEST</em>`
                            }
                            html+=`
                            ${element.productName}
                            </p>`
                            if(element.cost){
                                html+=`
                            <p class="price">
                                <em class="sale-per">${salePercent.toFixed()}</em>
                                <span class="sale">${element.sale.toLocaleString()}<span>원</span></span>
                                <del class="cost">${element.cost.toLocaleString()}<span>원</span></del>
                            </p>
                            `
                            }else{
                            html+=`
                            <p class="price">
                                <span class="sale">${element.sale.toLocaleString()}<span>원</span></span>
                            </p>
                            `
                            }
    
                if(element.tag){
                    html+=`<p class="tag">`;
    
                    prdTag = element.tag;
                    prdTag.forEach(element=>{
                        if(element == '증정'){
                            html+=`<span class="gift">${element}</span>`
                        }
                        if(element == '오늘드림'){
                            html+=`<span class="today">${element}</span>`
                        }
                    })
                    
                    html+=`</p>`;
                }
    
                html+=`
                        </div>
                        <div class="btn-wrap">
                            <button href="#" class="like"><span class="blind">찜</span><svg viewBox="0 0 32 32"><path d="M22.997 2.6c-1.898 0-3.705.615-5.189 1.734l-.276.247c-.454.423-.878.897-1.277 1.428l-.252.346-.074-.106c-.495-.697-1.024-1.297-1.587-1.798C12.789 3.244 10.944 2.6 9.003 2.6c-4.766 0-8.63 3.864-8.63 8.63 0 1.687.485 3.304 1.383 4.69.58 1.068 1.384 2.243 2.413 3.526l.49.599c.085.101.17.203.258.305l.539.622.28.317.587.645c.201.217.407.437.618.66l.65.675.337.343.698.698.361.354.745.72.778.736.809.75.84.766c.143.13.287.259.433.389l.888.788.92.804.952.819c.373.318.923.318 1.296 0l.952-.819.92-.804.888-.788.857-.774.825-.758.794-.744.384-.366.747-.722.714-.706.345-.348.667-.684.636-.67.603-.654c.196-.216.387-.43.572-.64l.541-.626c1.4-1.648 2.463-3.14 3.19-4.48.859-1.319 1.345-2.936 1.345-4.622 0-4.767-3.865-8.631-8.631-8.631zm0 1.995c3.665 0 6.636 2.97 6.636 6.636 0 1.298-.373 2.539-1.064 3.604l-.133.239c-1.198 2.111-3.292 4.655-6.283 7.634l-.736.723-.77.74-.804.756-.415.385-.856.781-.44.397-.909.807L16 28.36l-.28-.241c-.313-.27-.619-.538-.92-.802l-.886-.787c-.29-.26-.574-.516-.853-.77l-.82-.755-.397-.371-.771-.73-.738-.715c-.601-.588-1.168-1.16-1.7-1.715l-.623-.657c-.303-.325-.594-.644-.872-.956l-.54-.617C5.204 17.62 4.16 16.172 3.47 14.9c-.73-1.131-1.103-2.372-1.103-3.67 0-3.665 2.971-6.636 6.636-6.636 1.494 0 2.91.494 4.064 1.39.704.628 1.409 1.556 2.057 2.745.378.692 1.37.694 1.75.004.674-1.225 1.405-2.173 2.187-2.85 1.089-.817 2.475-1.289 3.936-1.289z"></path></svg></button>

                            <button href="#" class="cart"><span class="blind">장바구니</span><svg viewBox="0 0 22 22"><path d="M7.04553 6.46797H4.67141L3.18318 19.2667H18.8161L17.3278 6.46797H14.9537V7.46903C14.9537 7.96608 14.5507 8.36903 14.0537 8.36903C13.5566 8.36903 13.1537 7.96608 13.1537 7.46903V6.46797H8.84553V7.46903C8.84553 7.96608 8.44259 8.36903 7.94553 8.36903C7.44848 8.36903 7.04553 7.96608 7.04553 7.46903V6.46797ZM8.88096 4.66797H13.1471C13.0865 3.69216 12.6238 3.26091 12.2056 3.02945C11.9553 2.8909 11.6958 2.81427 11.4928 2.77341C11.3932 2.75336 11.3124 2.74296 11.2603 2.73771C11.2365 2.73532 11.2191 2.73403 11.209 2.7334C10.5217 2.73655 10.0751 2.9017 9.77764 3.09758C9.47353 3.29782 9.2668 3.56888 9.12384 3.86489C8.98938 4.14331 8.91771 4.43172 8.88096 4.66797ZM14.9494 4.66797H18.1293C18.5861 4.66797 18.9705 5.01023 19.0232 5.46402L20.7208 20.0628C20.7504 20.3179 20.6697 20.5735 20.4989 20.7653C20.3282 20.957 20.0836 21.0667 19.8268 21.0667H2.17247C1.91567 21.0667 1.6711 20.957 1.50032 20.7653C1.32955 20.5735 1.24883 20.3179 1.27849 20.0628L2.97602 5.46402C3.02879 5.01023 3.41316 4.66797 3.87 4.66797H7.06716C7.07299 4.60895 7.08033 4.54552 7.08959 4.47831C7.14044 4.10899 7.25218 3.60137 7.50298 3.08208C7.75607 2.55803 8.15777 2.00902 8.78776 1.5942C9.42149 1.17693 10.2289 0.93335 11.2291 0.93335L11.2517 0.933635L11.2291 1.83335C11.2517 0.933635 11.2522 0.933647 11.2527 0.93366L11.2537 0.933688L11.256 0.933752L11.2613 0.93392L11.2751 0.934447C11.2858 0.934895 11.2991 0.935553 11.3151 0.936516C11.3469 0.938441 11.3893 0.941597 11.4406 0.946764C11.5429 0.957069 11.6828 0.975547 11.848 1.0088C12.1747 1.07456 12.6214 1.20227 13.0773 1.45458C14.0021 1.96644 14.8798 2.95361 14.9494 4.66797Z"></path></svg></button>
                        </div>
                    </div>
                </li>
                `
                i++; 
            }
            
            $(`.sc-product .list${list}`).html(html)
        }
        prdList(6,11,1);
        $('.sc-product .other-btn').click(function(){
            $(this).hide();
            prdList(11,16,2);

        })
    })

    // Healthy Life
fetch('./assets/data/healthy.json')
.then(res=>res.json())
.then(json=>{
    data=json.items;
    html=``;

    data.forEach(element=>{
        html+=`
        <li class="swiper-slide healthy-item ${element.theme}">
            <a href="${element.linkUrl}">
                <figure class="img-box">
                    <img src="${element.thumbUrl}" alt>
                </figure>
                <div class="text-box">
                    <h3>${element.title}</h3>
                    <p>${element.desc[0]}<br>${element.desc[1]}</p>
                </div>
            </a>
        </li>
        `
    })
    $(`.sc-healthy .swiper-wrapper`).html(html)
    const healthyScroll = new Swiper(".sc-healthy .healthy-list",{
        slidesPerView:"auto",
        freeMode: true,
        spaceBetween: 8
    })
})
// 브랜드 탭 불러오기
fetch('./assets/data/brand.json')
    .then(res=>res.json())
    .then(json=>{
        data=json.items;
        html=``;

        data.forEach(element=>{
            html+=`
            <li class="tab-item swiper-slide">
                <a href="${element.linkUrl}" data-tab="#tab0${element.brandId}">${element.name}</a>
            </li>
            `
        })
        $(`.sc-brand .tab-list`).html(html)
    })
// 브랜드 리스트 불러오기
fetch('./assets/data/brand.json')
    .then(res=>res.json())
    .then(json=>{
        data=json.items;
        html=``;

        data.forEach(element=>{
            html+=`
            <div id="tab0${element.brandId}" class="swiper-slide">
                <div class="brand-area">
                    <a href="${element.linkUrl}">
                        <div class="img-box">
                            <img src="${element.backgroundUrl}" alt>
                        </div>
                        <div class="info-box">
                            <h3>${element.name}</h3>
                            <p>
                                <svg viewBox="0 0 32 32">
                                    <path d="M22.997 2.6c-1.898 0-3.705.615-5.189 1.734l-.276.247c-.454.423-.878.897-1.277 1.428l-.252.346-.074-.106c-.495-.697-1.024-1.297-1.587-1.798C12.789 3.244 10.944 2.6 9.003 2.6c-4.766 0-8.63 3.864-8.63 8.63 0 1.687.485 3.304 1.383 4.69.58 1.068 1.384 2.243 2.413 3.526l.49.599c.085.101.17.203.258.305l.539.622.28.317.587.645c.201.217.407.437.618.66l.65.675.337.343.698.698.361.354.745.72.778.736.809.75.84.766c.143.13.287.259.433.389l.888.788.92.804.952.819c.373.318.923.318 1.296 0l.952-.819.92-.804.888-.788.857-.774.825-.758.794-.744.384-.366.747-.722.714-.706.345-.348.667-.684.636-.67.603-.654c.196-.216.387-.43.572-.64l.541-.626c1.4-1.648 2.463-3.14 3.19-4.48.859-1.319 1.345-2.936 1.345-4.622 0-4.767-3.865-8.631-8.631-8.631zm0 1.995c3.665 0 6.636 2.97 6.636 6.636 0 1.298-.373 2.539-1.064 3.604l-.133.239c-1.198 2.111-3.292 4.655-6.283 7.634l-.736.723-.77.74-.804.756-.415.385-.856.781-.44.397-.909.807L16 28.36l-.28-.241c-.313-.27-.619-.538-.92-.802l-.886-.787c-.29-.26-.574-.516-.853-.77l-.82-.755-.397-.371-.771-.73-.738-.715c-.601-.588-1.168-1.16-1.7-1.715l-.623-.657c-.303-.325-.594-.644-.872-.956l-.54-.617C5.204 17.62 4.16 16.172 3.47 14.9c-.73-1.131-1.103-2.372-1.103-3.67 0-3.665 2.971-6.636 6.636-6.636 1.494 0 2.91.494 4.064 1.39.704.628 1.409 1.556 2.057 2.745.378.692 1.37.694 1.75.004.674-1.225 1.405-2.173 2.187-2.85 1.089-.817 2.475-1.289 3.936-1.289z"></path>
                                </svg>
                            <span>${element.likes}</span>명이 좋아합니다
                            </p>
                        </div>
                    </a>
                </div>
                <ul class="prd-list prd-list02 brand${element.brandId}">
                
                </ul>
            </div>
            `
        })
        $(`.sc-brand .brand .swiper-wrapper`).html(html)
        
        // 브랜드별 상품 리스트 불러오기
        fetch('./assets/data/product.json')
        .then(res=>res.json())
        .then(json=>{
            data = json.items;
            function sortData(brandId,sortId){
                // 브랜드가 일치하는 상품 필터링
                brandData = data.filter(function(parm){
                    return parm.brand === sortId;
                })
        
                let html=``;
        
                brandData.forEach(element=>{
                    salePercent = (( element.cost - element.sale ) / element.cost)*100 ;
        
                    html+=`
                    <li class="prd-item">
                        <a href="${element.linkUrl}"></a>
                        <figure class="img-box">
                            <img src="${element.thumbUrl}" alt>
                        </figure>
                        <div class="text-box">
                            <div class="info-wrap">
                                <p class="prd-name">
                                `
                                if(element.best){
                                    html+=`<em class="best">BEST</em>`
                                }
                                html+=`
                                ${element.productName}
                                </p>
                                `
                                if(element.cost){
                                    html+=`
                                <p class="price">
                                    <em class="sale-per">${salePercent.toFixed()}</em>
                                    <span class="sale">${element.sale.toLocaleString()}<span>원</span></span>
                                    <del class="cost">${element.cost.toLocaleString()}<span>원</span></del>
                                </p>
                                `
                                }else{
                                html+=`
                                <p class="price">
                                    <span class="sale">${element.sale.toLocaleString()}<span>원</span></span>
                                </p>
                                `
                                }
        
                                if(element.tag){
                                    html+=`
                                <p class="tag">`;
                    
                                    prdTag = element.tag;
                                    prdTag.forEach(element=>{
                                        if(element == '증정'){
                                            html+=`
                                            <span class="gift">${element}</span>
                                            `
                                        }
                                        if(element == '오늘드림'){
                                            html+=`<span class="today">${element}
                                            </span>
                                            `
                                        }
                                    })
                                    
                                    html+=`
                                </p>
                                    `;
                                }
                            html+=`
                            </div>
                            <div class="btn-wrap">
                                <button href="#" class="like"><span class="blind">찜</span><svg viewBox="0 0 32 32"><path d="M22.997 2.6c-1.898 0-3.705.615-5.189 1.734l-.276.247c-.454.423-.878.897-1.277 1.428l-.252.346-.074-.106c-.495-.697-1.024-1.297-1.587-1.798C12.789 3.244 10.944 2.6 9.003 2.6c-4.766 0-8.63 3.864-8.63 8.63 0 1.687.485 3.304 1.383 4.69.58 1.068 1.384 2.243 2.413 3.526l.49.599c.085.101.17.203.258.305l.539.622.28.317.587.645c.201.217.407.437.618.66l.65.675.337.343.698.698.361.354.745.72.778.736.809.75.84.766c.143.13.287.259.433.389l.888.788.92.804.952.819c.373.318.923.318 1.296 0l.952-.819.92-.804.888-.788.857-.774.825-.758.794-.744.384-.366.747-.722.714-.706.345-.348.667-.684.636-.67.603-.654c.196-.216.387-.43.572-.64l.541-.626c1.4-1.648 2.463-3.14 3.19-4.48.859-1.319 1.345-2.936 1.345-4.622 0-4.767-3.865-8.631-8.631-8.631zm0 1.995c3.665 0 6.636 2.97 6.636 6.636 0 1.298-.373 2.539-1.064 3.604l-.133.239c-1.198 2.111-3.292 4.655-6.283 7.634l-.736.723-.77.74-.804.756-.415.385-.856.781-.44.397-.909.807L16 28.36l-.28-.241c-.313-.27-.619-.538-.92-.802l-.886-.787c-.29-.26-.574-.516-.853-.77l-.82-.755-.397-.371-.771-.73-.738-.715c-.601-.588-1.168-1.16-1.7-1.715l-.623-.657c-.303-.325-.594-.644-.872-.956l-.54-.617C5.204 17.62 4.16 16.172 3.47 14.9c-.73-1.131-1.103-2.372-1.103-3.67 0-3.665 2.971-6.636 6.636-6.636 1.494 0 2.91.494 4.064 1.39.704.628 1.409 1.556 2.057 2.745.378.692 1.37.694 1.75.004.674-1.225 1.405-2.173 2.187-2.85 1.089-.817 2.475-1.289 3.936-1.289z"></path></svg></button>

                                <button href="#" class="cart"><span class="blind">장바구니</span><svg viewBox="0 0 22 22"><path d="M7.04553 6.46797H4.67141L3.18318 19.2667H18.8161L17.3278 6.46797H14.9537V7.46903C14.9537 7.96608 14.5507 8.36903 14.0537 8.36903C13.5566 8.36903 13.1537 7.96608 13.1537 7.46903V6.46797H8.84553V7.46903C8.84553 7.96608 8.44259 8.36903 7.94553 8.36903C7.44848 8.36903 7.04553 7.96608 7.04553 7.46903V6.46797ZM8.88096 4.66797H13.1471C13.0865 3.69216 12.6238 3.26091 12.2056 3.02945C11.9553 2.8909 11.6958 2.81427 11.4928 2.77341C11.3932 2.75336 11.3124 2.74296 11.2603 2.73771C11.2365 2.73532 11.2191 2.73403 11.209 2.7334C10.5217 2.73655 10.0751 2.9017 9.77764 3.09758C9.47353 3.29782 9.2668 3.56888 9.12384 3.86489C8.98938 4.14331 8.91771 4.43172 8.88096 4.66797ZM14.9494 4.66797H18.1293C18.5861 4.66797 18.9705 5.01023 19.0232 5.46402L20.7208 20.0628C20.7504 20.3179 20.6697 20.5735 20.4989 20.7653C20.3282 20.957 20.0836 21.0667 19.8268 21.0667H2.17247C1.91567 21.0667 1.6711 20.957 1.50032 20.7653C1.32955 20.5735 1.24883 20.3179 1.27849 20.0628L2.97602 5.46402C3.02879 5.01023 3.41316 4.66797 3.87 4.66797H7.06716C7.07299 4.60895 7.08033 4.54552 7.08959 4.47831C7.14044 4.10899 7.25218 3.60137 7.50298 3.08208C7.75607 2.55803 8.15777 2.00902 8.78776 1.5942C9.42149 1.17693 10.2289 0.93335 11.2291 0.93335L11.2517 0.933635L11.2291 1.83335C11.2517 0.933635 11.2522 0.933647 11.2527 0.93366L11.2537 0.933688L11.256 0.933752L11.2613 0.93392L11.2751 0.934447C11.2858 0.934895 11.2991 0.935553 11.3151 0.936516C11.3469 0.938441 11.3893 0.941597 11.4406 0.946764C11.5429 0.957069 11.6828 0.975547 11.848 1.0088C12.1747 1.07456 12.6214 1.20227 13.0773 1.45458C14.0021 1.96644 14.8798 2.95361 14.9494 4.66797Z"></path></svg></button>
                            </div>
                        </div>
                    </li>
                    `
                })
                $(`.sc-brand .brand${brandId}`).html(html);
            }
            sortData(1,"빌리프");
            sortData(2,"아벤느");
            sortData(3,"빌리프");
            sortData(4,"아벤느");
        })
        // 브랜드 슬라이더
        const brandTab = new Swiper(".sc-brand .swiper-tab",{
            slidesPerView:"auto",
            freeMode:true,
            spaceBetween: 10,
        })
        const brandSlider = new Swiper(".sc-brand .swiper",{
            loop:true,
            spaceBetween:30,
            navigation:{
                nextEl:".sc-brand .next",
                prevEl:".sc-brand .prev"
            },
            pagination:{
                el:".sc-brand .pagination",
                type: "fraction"
            },
            thumbs: {
                swiper: brandTab,
            }
        })
    })

// 오늘의 특가
fetch('./assets/data/product.json')
.then(res=>res.json())
.then(json=>{
        data = json.items;
        html = ``;

        let i = 4;
        while(i < 18) {
            element = data[i];
            
            salePercent = (( element.cost - element.sale ) / element.cost)*100 ;

            html+=`
            <li class="prd-item swiper-slide">
                <a href="${element.linkUrl}"></a>
                <figure class="img-box">
                    <img src="${element.thumbUrl}" alt>
                </figure>
                <div class="text-box">
                    <p class="prd-name">
                    `
                    if(element.best){
                        html+=`<em class="best">BEST</em>`
                    }
                    html+=`
                    ${element.productName}
                    </p>
                    <div class="info-wrap">
                        <p class="price">`
                        if(element.cost){
                            html+=`<del class="cost">${element.cost.toLocaleString()}<span>원</span></del><em class="sale-per">${salePercent.toFixed()}</em>`
                        }   
                        html+=`
                            <em class="sale">${element.sale.toLocaleString()}<span>원</span></em>
                        </p>`

            if(element.tag){
                html+=`<p class="tag">`;

                prdTag = element.tag;
                prdTag.forEach(element=>{
                    if(element == '증정'){
                        html+=`<span class="gift">${element}</span>`
                    }
                    if(element == '오늘드림'){
                        html+=`<span class="today">${element}</span>`
                    }
                })
                
                html+=`</p>`;
            }

            html+=`
                    </div>
                    <div class="btn-wrap">
                        <button href="#" class="like"><span class="blind">찜</span><svg viewBox="0 0 32 32"><path d="M22.997 2.6c-1.898 0-3.705.615-5.189 1.734l-.276.247c-.454.423-.878.897-1.277 1.428l-.252.346-.074-.106c-.495-.697-1.024-1.297-1.587-1.798C12.789 3.244 10.944 2.6 9.003 2.6c-4.766 0-8.63 3.864-8.63 8.63 0 1.687.485 3.304 1.383 4.69.58 1.068 1.384 2.243 2.413 3.526l.49.599c.085.101.17.203.258.305l.539.622.28.317.587.645c.201.217.407.437.618.66l.65.675.337.343.698.698.361.354.745.72.778.736.809.75.84.766c.143.13.287.259.433.389l.888.788.92.804.952.819c.373.318.923.318 1.296 0l.952-.819.92-.804.888-.788.857-.774.825-.758.794-.744.384-.366.747-.722.714-.706.345-.348.667-.684.636-.67.603-.654c.196-.216.387-.43.572-.64l.541-.626c1.4-1.648 2.463-3.14 3.19-4.48.859-1.319 1.345-2.936 1.345-4.622 0-4.767-3.865-8.631-8.631-8.631zm0 1.995c3.665 0 6.636 2.97 6.636 6.636 0 1.298-.373 2.539-1.064 3.604l-.133.239c-1.198 2.111-3.292 4.655-6.283 7.634l-.736.723-.77.74-.804.756-.415.385-.856.781-.44.397-.909.807L16 28.36l-.28-.241c-.313-.27-.619-.538-.92-.802l-.886-.787c-.29-.26-.574-.516-.853-.77l-.82-.755-.397-.371-.771-.73-.738-.715c-.601-.588-1.168-1.16-1.7-1.715l-.623-.657c-.303-.325-.594-.644-.872-.956l-.54-.617C5.204 17.62 4.16 16.172 3.47 14.9c-.73-1.131-1.103-2.372-1.103-3.67 0-3.665 2.971-6.636 6.636-6.636 1.494 0 2.91.494 4.064 1.39.704.628 1.409 1.556 2.057 2.745.378.692 1.37.694 1.75.004.674-1.225 1.405-2.173 2.187-2.85 1.089-.817 2.475-1.289 3.936-1.289z"></path></svg></button>

                        <button href="#" class="cart"><span class="blind">장바구니</span><svg viewBox="0 0 22 22"><path d="M7.04553 6.46797H4.67141L3.18318 19.2667H18.8161L17.3278 6.46797H14.9537V7.46903C14.9537 7.96608 14.5507 8.36903 14.0537 8.36903C13.5566 8.36903 13.1537 7.96608 13.1537 7.46903V6.46797H8.84553V7.46903C8.84553 7.96608 8.44259 8.36903 7.94553 8.36903C7.44848 8.36903 7.04553 7.96608 7.04553 7.46903V6.46797ZM8.88096 4.66797H13.1471C13.0865 3.69216 12.6238 3.26091 12.2056 3.02945C11.9553 2.8909 11.6958 2.81427 11.4928 2.77341C11.3932 2.75336 11.3124 2.74296 11.2603 2.73771C11.2365 2.73532 11.2191 2.73403 11.209 2.7334C10.5217 2.73655 10.0751 2.9017 9.77764 3.09758C9.47353 3.29782 9.2668 3.56888 9.12384 3.86489C8.98938 4.14331 8.91771 4.43172 8.88096 4.66797ZM14.9494 4.66797H18.1293C18.5861 4.66797 18.9705 5.01023 19.0232 5.46402L20.7208 20.0628C20.7504 20.3179 20.6697 20.5735 20.4989 20.7653C20.3282 20.957 20.0836 21.0667 19.8268 21.0667H2.17247C1.91567 21.0667 1.6711 20.957 1.50032 20.7653C1.32955 20.5735 1.24883 20.3179 1.27849 20.0628L2.97602 5.46402C3.02879 5.01023 3.41316 4.66797 3.87 4.66797H7.06716C7.07299 4.60895 7.08033 4.54552 7.08959 4.47831C7.14044 4.10899 7.25218 3.60137 7.50298 3.08208C7.75607 2.55803 8.15777 2.00902 8.78776 1.5942C9.42149 1.17693 10.2289 0.93335 11.2291 0.93335L11.2517 0.933635L11.2291 1.83335C11.2517 0.933635 11.2522 0.933647 11.2527 0.93366L11.2537 0.933688L11.256 0.933752L11.2613 0.93392L11.2751 0.934447C11.2858 0.934895 11.2991 0.935553 11.3151 0.936516C11.3469 0.938441 11.3893 0.941597 11.4406 0.946764C11.5429 0.957069 11.6828 0.975547 11.848 1.0088C12.1747 1.07456 12.6214 1.20227 13.0773 1.45458C14.0021 1.96644 14.8798 2.95361 14.9494 4.66797Z"></path></svg></button>
                    </div>
                </div>
            </li>
            `
            i++; 
        }
        
        $(`.sc-todays-sale .prd-list`).html(html)
        const todaysScroll = new Swiper(".sc-todays-sale .swiper",{
            slidesPerView:"auto",
            freeMode:true,
            spaceBetween: 10,
        })
        
    })

    
// 실시간 View 랭킹
fetch('./assets/data/product.json')
.then(res=>res.json())
.then(json=>{
        data = json.items;
        html = ``;

        let i = 10;
        while(i < 15) {
            element = data[i];
            
            salePercent = (( element.cost - element.sale ) / element.cost)*100 ;

            html+=`
            <li class="prd-item ranking">
                <a href="${element.linkUrl}"></a>
                <figure class="img-box">
                    <img src="${element.thumbUrl}" alt>
                </figure>
                <div class="text-box">
                    <div class="info-wrap">
                        <p class="prd-name">
                        `
                        if(element.best){
                            html+=`<em class="best">BEST</em>`
                        }
                        html+=`
                        ${element.productName}
                        </p>
                        `
                        if(element.cost){
                            html+=`
                        <p class="price">
                            <em class="sale-per">${salePercent.toFixed()}</em>
                            <span class="sale">${element.sale.toLocaleString()}<span>원</span></span>
                            <del class="cost">${element.cost.toLocaleString()}<span>원</span></del>
                        </p>
                        `
                        }else{
                        html+=`
                        <p class="price">
                            <span class="sale">${element.sale.toLocaleString()}<span>원</span></span>
                        </p>
                        `
                        }

            if(element.tag){
                html+=`<p class="tag">`;

                prdTag = element.tag;
                prdTag.forEach(element=>{
                    if(element == '증정'){
                        html+=`<span class="gift">${element}</span>`
                    }
                    if(element == '오늘드림'){
                        html+=`<span class="today">${element}</span>`
                    }
                })
                
                html+=`</p>`;
            }

            html+=`
                    <p class="view"><span>${element.view}</span>명이 보고 있어요</p>
                    </div>
                    <div class="btn-wrap">
                        <button href="#" class="like"><span class="blind">찜</span><svg viewBox="0 0 32 32"><path d="M22.997 2.6c-1.898 0-3.705.615-5.189 1.734l-.276.247c-.454.423-.878.897-1.277 1.428l-.252.346-.074-.106c-.495-.697-1.024-1.297-1.587-1.798C12.789 3.244 10.944 2.6 9.003 2.6c-4.766 0-8.63 3.864-8.63 8.63 0 1.687.485 3.304 1.383 4.69.58 1.068 1.384 2.243 2.413 3.526l.49.599c.085.101.17.203.258.305l.539.622.28.317.587.645c.201.217.407.437.618.66l.65.675.337.343.698.698.361.354.745.72.778.736.809.75.84.766c.143.13.287.259.433.389l.888.788.92.804.952.819c.373.318.923.318 1.296 0l.952-.819.92-.804.888-.788.857-.774.825-.758.794-.744.384-.366.747-.722.714-.706.345-.348.667-.684.636-.67.603-.654c.196-.216.387-.43.572-.64l.541-.626c1.4-1.648 2.463-3.14 3.19-4.48.859-1.319 1.345-2.936 1.345-4.622 0-4.767-3.865-8.631-8.631-8.631zm0 1.995c3.665 0 6.636 2.97 6.636 6.636 0 1.298-.373 2.539-1.064 3.604l-.133.239c-1.198 2.111-3.292 4.655-6.283 7.634l-.736.723-.77.74-.804.756-.415.385-.856.781-.44.397-.909.807L16 28.36l-.28-.241c-.313-.27-.619-.538-.92-.802l-.886-.787c-.29-.26-.574-.516-.853-.77l-.82-.755-.397-.371-.771-.73-.738-.715c-.601-.588-1.168-1.16-1.7-1.715l-.623-.657c-.303-.325-.594-.644-.872-.956l-.54-.617C5.204 17.62 4.16 16.172 3.47 14.9c-.73-1.131-1.103-2.372-1.103-3.67 0-3.665 2.971-6.636 6.636-6.636 1.494 0 2.91.494 4.064 1.39.704.628 1.409 1.556 2.057 2.745.378.692 1.37.694 1.75.004.674-1.225 1.405-2.173 2.187-2.85 1.089-.817 2.475-1.289 3.936-1.289z"></path></svg></button>

                        <button href="#" class="cart"><span class="blind">장바구니</span><svg viewBox="0 0 22 22"><path d="M7.04553 6.46797H4.67141L3.18318 19.2667H18.8161L17.3278 6.46797H14.9537V7.46903C14.9537 7.96608 14.5507 8.36903 14.0537 8.36903C13.5566 8.36903 13.1537 7.96608 13.1537 7.46903V6.46797H8.84553V7.46903C8.84553 7.96608 8.44259 8.36903 7.94553 8.36903C7.44848 8.36903 7.04553 7.96608 7.04553 7.46903V6.46797ZM8.88096 4.66797H13.1471C13.0865 3.69216 12.6238 3.26091 12.2056 3.02945C11.9553 2.8909 11.6958 2.81427 11.4928 2.77341C11.3932 2.75336 11.3124 2.74296 11.2603 2.73771C11.2365 2.73532 11.2191 2.73403 11.209 2.7334C10.5217 2.73655 10.0751 2.9017 9.77764 3.09758C9.47353 3.29782 9.2668 3.56888 9.12384 3.86489C8.98938 4.14331 8.91771 4.43172 8.88096 4.66797ZM14.9494 4.66797H18.1293C18.5861 4.66797 18.9705 5.01023 19.0232 5.46402L20.7208 20.0628C20.7504 20.3179 20.6697 20.5735 20.4989 20.7653C20.3282 20.957 20.0836 21.0667 19.8268 21.0667H2.17247C1.91567 21.0667 1.6711 20.957 1.50032 20.7653C1.32955 20.5735 1.24883 20.3179 1.27849 20.0628L2.97602 5.46402C3.02879 5.01023 3.41316 4.66797 3.87 4.66797H7.06716C7.07299 4.60895 7.08033 4.54552 7.08959 4.47831C7.14044 4.10899 7.25218 3.60137 7.50298 3.08208C7.75607 2.55803 8.15777 2.00902 8.78776 1.5942C9.42149 1.17693 10.2289 0.93335 11.2291 0.93335L11.2517 0.933635L11.2291 1.83335C11.2517 0.933635 11.2522 0.933647 11.2527 0.93366L11.2537 0.933688L11.256 0.933752L11.2613 0.93392L11.2751 0.934447C11.2858 0.934895 11.2991 0.935553 11.3151 0.936516C11.3469 0.938441 11.3893 0.941597 11.4406 0.946764C11.5429 0.957069 11.6828 0.975547 11.848 1.0088C12.1747 1.07456 12.6214 1.20227 13.0773 1.45458C14.0021 1.96644 14.8798 2.95361 14.9494 4.66797Z"></path></svg></button>
                    </div>
                </div>
            </li>
            `
            i++; 
        }
        
        $(`.sc-ranking .prd-list`).html(html)
        
    })

//푸터 토글
$('#addrToggle').click(function(){
    $(this).toggleClass('on');
    $('.toggle-area').toggle();
})