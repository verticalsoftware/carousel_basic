//adam@vertical-software.com made this in like 30 minutes for vertical-software.com.... 
//feel free to use/mod it in all its glory but it comes as is
//and I have no real intention of maintaining/supporting it.
//REQUIRES jQuery 1.8.1+

var sliderInterval = {};

function initSlider(slider, duration){

    $(slider).children().each(function (i, v) {
        if (i > 0) {
            $(this).hide();
        }else{
            $(this).addClass('carDisplayed');
        }
    })

    sliderInterval = setInterval(function() {swapSlide(slider)}, 8000);

    $(slider).on('mouseover', function () {
        clearInterval(sliderInterval);
    }).on('mouseout', function () {
        sliderInterval = setInterval(function() {swapSlide(slider)}, 8000);
    });

    var knobCount = $(slider).children(':not(#slideKnobsContainer)').length;

    for(var i = 0; i < knobCount; i++){
        $('#slideKnobsContainer').append('<span class="slideKnob">.</span>');
    }

    $('.slideKnob').on('click', function () {
        GoToSlide($(this).parent().children().index($(this)));
    });

    $($('#slideKnobsContainer').children()[0]).css('color', '#fff');
}

function GoToSlide(slideIndex){
    $('.slideKnob').off('click');
    $('#images').children('.carDisplayed').fadeOut('slow', function () {
        $(this).removeClass('carDisplayed');
        $($('#images').children()[slideIndex]).fadeIn('slow', function () {
            $(this).addClass('carDisplayed');
            $('#slideKnobsContainer').children().css('color', '#a3a1a1');
            $($('#slideKnobsContainer').children()[slideIndex]).css('color', '#FFF');
            
            $('.slideKnob').on('click', function () {
                GoToSlide($(this).parent().children().index($(this)));
            }); 
        });
    });
}

function swapSlide(slider){
        $('.slideKnob').off('click');
        $(slider).children('.carDisplayed').fadeOut('slow', function () {
            $(this).removeClass('carDisplayed');
            if ($(this).next(':not(#slideKnobsContainer)').length != 0){
                $(this).next(':not(#slideKnobsContainer)').fadeIn('slow', function () {
                    $(this).addClass('carDisplayed');
                    $('#slideKnobsContainer').children().css('color', '#a3a1a1');
                    $($('#slideKnobsContainer').children()[$(this).parent().children().index($(this))]).css('color', '#FFF');                                        
                    
                    $('.slideKnob').on('click', function () {
                        GoToSlide($(this).parent().children().index($(this)));
                    }); 
                });
            }else{
                $(this).siblings(':not(#slideKnobsContainer)').first().fadeIn('slow', function () {
                    $(this).addClass('carDisplayed');
                    $('#slideKnobsContainer').children().css('color', '#a3a1a1');
                    $($('#slideKnobsContainer').children()[$(this).parent().children().index($(this))]).css('color', '#FFF');                    

                    $('.slideKnob').on('click', function () {
                        GoToSlide($(this).parent().children().index($(this)));
                    });
                });
            }
        });
}