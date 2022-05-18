$(document).ready(function(){
    function random_elems(arr, count) {
        let len = arr.length;
        let lookup = {};
        let tmp = [];

        if (count > len) count = len;

        for (let i = 0; i < count; i++) {
          let index;
          do {
            index = ~~(Math.random() * len);
          } while (index in lookup);
          lookup[index] = null;
          tmp.push(arr[index]);
        }

        return tmp;
    }

    let array = [];
    const token = '69efc8d8b09bf3c143933e19014082';
    fetch('https://graphql.datocms.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                query: `{ 
                    allNewsPosts(first: 10, skip: 0) { id, title, description, covers {id, filename, url}, video {url}, categories, },
                }`
            }),
    })
    .then(res => res.json())
    .then((res) => {
        let obj = res.data.allNewsPosts;
        var randomData = random_elems(obj, obj.length);
       
        randomData.forEach( (item)=> {
            array.push(item)
            data(item)
        })
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(()=> {
        data;
        projectSlider();
        itemLoading();
    });

    function data(item){
        // console.log(item)
        $('.list').append(`
            <div class="list__item border">
                <div class="list__item--head">
                    <h1 class="list__item--title">
                        ${item?.title}
                    </h1>
                    ${item.description ? (`
                        <div class="list__item--desc">
                            ${item?.description} 
                        </div>
                    `) : ''}
                </div>
                ${item.covers.length ? `
                    <figure class="list__item--cover">
                            <div class="projects__slider owl-carousel owl-theme owl-loaded">
                                ${item.covers && item.covers.map( i=>`<div><img src="${i.url}" class="list__item--img" alt="data"></div>`)}
                            </div>
                        <div class="d-flex justify-content-center">
                            <div class="projects__slider--dots"></div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <div class="projects__slider--navs"></div>
                        </div>
                    </figure>
                ` : ''}
                ${item.video ? `
                    <iframe width="100%" height="315" src="${item.video.url}" title="${item.video.title}" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                ` : ''}
                ${item.categories ? `
                    <ul>
                        ${item.categories && item.categories.map( i=>`<li>${i}</li>`)}
                    </ul>
                ` : ''}
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


        // filter func
        let filterDomains = () =>{
            // get checked
            var zones = $("[name='zone']:checkbox:checked").map(function(){
                return $(this).data('zone');
            }).get();  


            let filtered =  array.filter( item => (!zones.length || zones.some(zone => zone == item.categories.filter( (i)=>i ) ) ) )
    
            // clear html element
            $('.list').html('');

            var randomData = random_elems(filtered, filtered.length);
            randomData.map ( (item, key) => data(item));
        }
    
        // input change
        $('.filter').on('change', 'input', function(event) {
            filterDomains();
            projectSlider();
            itemLoading();
        })
})