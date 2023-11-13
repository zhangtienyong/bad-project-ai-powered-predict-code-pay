var checkList = document.getElementById('list1');
var items = document.getElementById('items');
        checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
            if (items.classList.contains('visible')){
                items.classList.remove('visible');
                items.style.display = "none";
            }
            
            else{
                items.classList.add('visible');
                items.style.display = "block";
            }
            
            
        }

        items.onblur = function(evt) {
            items.classList.remove('visible');
        }