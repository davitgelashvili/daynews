$(document).ready(function(){
    fetch('./date.json')
    .then(res => res.json())
    .then(res => data(res) )
    .finally(()=> {
        data;
        projectSlider();
        itemLoading();
    })

    function data(items){
        items.map( (item)=>{
            $('.list').append(`
                <div class="list__item border">
                    <div class="list__item--head">
                        <h1 class="list__item--title">
                            ${item.title}
                        </h1>
                        ${item.desc ? (`
                            <div class="list__item--desc">
                                <p class="list__item--paragrap">
                                    ${item?.desc} 
                                    <span>...</span>
                                    <button>See more</button>
                                    <span class="list__item--detail">
                                    </span>
                                </p>
                            </div>
                        `) : ''}
                    </div>
                    <figure class="list__item--cover">
                        <div class="projects__slider owl-carousel owl-theme owl-loaded">
                            ${imgObject(item.img)}
                        </div>
                        <div class="d-flex justify-content-center">
                            <div class="projects__slider--dots"></div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <div class="projects__slider--navs"></div>
                        </div>
                    </figure>
                    <div class="list__item--footer d-flex justify-content-between">
                        <button class="list__item--btn">
                            Like (${item.like})
                        </button>
                        <button class="list__item--btn">
                            Commnet
                        </button>
                        <button class="list__item--btn share-btn">
                            Share
                        </button>
                    </div>
                </div>    
            `)
        } )
    }   

    function imgObject(data){   
        if(data.length > 1){
            for (let i = 0; i < data.length; i++) {
                return `
                    <div><img src="./img/${data[0]}" class="list__item--img" alt="data"></div>
                    <div><img src="./img/${data[1]}" class="list__item--img" alt="data"></div>
                `;
            }
        }else {
            return `
                <div><img src="./img/${data}" class="list__item--img" alt="data"></div>
            `;  
        }
    }

    function itemLoading(){
        $(".list .list__item").slice(10).hide();

        var mincount = 10;
        var maxcount = 20;

        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() >= $(document).height() - 50) {
                $(".list .list__item").slice(mincount, maxcount).slideDown(400);
                mincount = mincount + 10;
                maxcount = maxcount + 10
            }
        });
    }


    function projectSlider(){    
        $('.projects__slider').owlCarousel({
            margin:0,
            responsiveClass: true,
            dots: false,
            dotsContainer: '.projects__slider--dots',
            navContainer: '.projects__slider--navs',
            navText: [
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"/></svg>`,
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/></svg>`
            ],
            responsive:{
                0:{
                    items:1,
                }
            }
        })
        
        // $('.projects__slider--dots .owl-dot').on( 'click', function() {
        //     $('.projects__slider').trigger('to.owl.carousel', [$(this).index(), 300]);
        //     $( '.projects__slider--dots .owl-dot' ).removeClass( 'active' );
        //     $(this).addClass( 'active' );
        // })

    }
})