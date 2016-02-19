$(document).ready(function(){
    getAnimals();
    $('#animal_form').on('submit', addAnimal);
});

function addAnimal() {
    event.preventDefault();

    var results = {};

    $.each($('#animal_form').serializeArray(), function(i, field) {
        results[field.name] = field.value;
    });

    $.ajax({
        type: 'POST',
        url: '/animal',
        data: results,
        success: function(data) {
            if(data) {
                //console.log('from server:', data);
                getAnimals();
            } else {
                console.log('error');
            }
            $('#animal_form').find('input[type=text]').val('');
        }
    });
}

function getAnimals() {
    $.ajax({
        type: 'GET',
        url: '/animal',
        success: function (data) {
            //console.log(data);
            appendAnimal(data);
        }
    });
}

function appendAnimal(data) {
    $('.animal_list').children().remove();

    data.forEach(function(animal) {
        $('.animal_list').append('<div class="animals"></div>');

        var $el = $('.animal_list').children().last();

        $el.append('<p>Animal Id: ' + animal.id + ' </p>');
        $el.append('<p>Animal Type: ' + animal.animal_type + '</p>');
        $el.append('<p>Totoal number of ' + animal.animal_type + 's:' + " " + animal.type_total + '</p>');
    });
}