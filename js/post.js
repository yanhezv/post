(function(){
    var st = {
        parent  : '.post',
        coment  : '.comentarios',
        form    : 'form.nuevo_comentario',
        elInput : 'input[name="comentario"]',

        username : 'Omar Villanueva Sotelo',
        photo    : 'foto-2.jpeg',

        arrayComent : []
    };

    var dom = {};

    var catchDom = function() {
        dom.parent  = $(st.parent);
        dom.coment  = $(st.coment, dom.parent);

        dom.form    = $(st.form, dom.parent);
        dom.elInput = $(st.elInput, dom.form);
    }

    var suscribeEvents = function() {
        dom.form.on('submit',events.stopSubmit);
    }

    var events = {
        stopSubmit : function(e) {
            e.preventDefault();

            var objComent = {
                date   : new Date(),
                coment : dom.elInput.val()
            }

            st.arrayComent.push(objComent);

            dom.coment.empty();
            $.each(st.arrayComent, function(index, obj) {
                var time    = fn.getTimeElapsed(obj.date, objComent.date),
                    newHtml = fn.getNewComent(obj.coment, time);

                dom.coment.append(newHtml);
            });

            dom.elInput.val('');
            // console.log(st.arrayComent);
        }
    }

    var fn = {
        getNewComent : function(coment, time) {
            return  '<li>' +
                        '<figure class="foto">' +
                            '<a href="../img/' + st.photo + '" target="_blank" class="icono">' +
                                '<img src="../img/' + st.photo + '" alt="Foto">' +
                            '</a>' +
                        '</figure>' +
                        '<div class="informacion">' +
                            '<h2>' +
                                '<a href="../img/' + st.photo + '" target="_blank">' + st.username + '</a>' +
                                // '<span>+1</span>' +
                            '</h2>' +
                            '<p>' + coment + '</p>' +
                        '</div>' +
                        '<div class="tiempo">' +
                            '<span>' + time + ' sec.</span>' +
                        '</div>' +
                    '</li>';
        },
        getTimeElapsed(date, currentDate) {
            var mintDate    = date.getMinutes(),
                secondsDate = date.getSeconds(),
                totalDate   = mintDate * 60 + secondsDate;

            var mintCurrent    = currentDate.getMinutes(),
                secondsCurrent = currentDate.getSeconds(),
                totalCurrent   = mintCurrent * 60 + secondsCurrent;

            return totalCurrent - totalDate;
        }
    }

    function initialize() {
        catchDom();
        suscribeEvents();
    }

    initialize();
})();
