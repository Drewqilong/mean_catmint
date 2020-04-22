angular.module('cartControllers', [])

//Shopping cart
.controller('shoppingcartCtrl', function($scope){
    $scope.load = function () {
        var aData = [{
            "imgUrl": "assets/img/services/image_04.jpg",
            "proName": " Walk the cat ",
            "proPrice": "20",
            "proComm": "168"
        },
        {
            "imgUrl": "assets/img/services/image_05.jpg",
            "proName": " Feed the cat ",
            "proPrice": "10",
            "proComm": "364"
        },
        {
            "imgUrl": "assets/img/services/image_06.jpg",
            "proName": " Bring the cat to the hospital ",
            "proPrice": "30",
            "proComm": "56"
        }
    ];
    var oBox = document.getElementById("box");
    var oCar = document.getElementById("car");
    var oUl = oBox.getElementsByTagName("ul")[0];
  
    for (var i = 0; i < aData.length; i++) {
        var oLi = document.createElement("li");
        var data = aData[i];
  
        oLi.innerHTML += '<div class="pro_img"><img src="' + data["imgUrl"] + '" width="150" height="150"></div>';
        oLi.innerHTML += '<h3 class="pro_name"><a href="#">' + data["proName"] + '</a></h3>';
        oLi.innerHTML += '<p class="pro_price">' + "$" + data["proPrice"] ;
        oLi.innerHTML += '<p class="pro_rank">' + data["proComm"] + ' people like it</p>';
        oLi.innerHTML += '<div class="add_btn">Add to the cart</div>';
        oUl.appendChild(oLi);
  
    }
    var aBtn = getClass(oBox, "add_btn");//获取box下的所有添加购物车按钮
    var number = 0;//初始化商品数量
    for (var i = 0; i < aBtn.length; i++) {
        number++;
        aBtn[i].index = i;
        aBtn[i].onclick = function() {
            var oDiv = document.createElement("div");
            var data = aData[this.index];
            oDiv.className = "row hid";
            oDiv.innerHTML += '<div class="check left"> <i class="i_check" id="i_check" onclick="i_check()" >√</i></div>';
            oDiv.innerHTML += '<div class="img left"><img src="' + data["imgUrl"] + '" width="80" height="80"></div>';
            oDiv.innerHTML += '<div class="name left"><span>' + data["proName"] + '</span></div>';
            oDiv.innerHTML += '<div class="price left"><span>' + data["proPrice"]+ '</span></div>';
            oDiv.innerHTML +=' <div class="item_count_i"><div class="num_count"><div class="count_d">-</div><div class="c_num">1</div><div class="count_i">+</div></div> </div>'
            oDiv.innerHTML += '<div class="subtotal left"><span>' + data["proPrice"] + '</span></div>';
            oDiv.innerHTML += '<div class="ctrl left"><a href="javascript:;">×</a></div>';
            oCar.appendChild(oDiv);
            var flag = true;
            var check = oDiv.firstChild.getElementsByTagName("i")[0];
            check.onclick = function() {
                // console.log(check.className);
                if (check.className == "i_check i_acity") {
                    check.classList.remove("i_acity");
  
                } else {
                    check.classList.add("i_acity");
                }
                getAmount();
            }
            var delBtn = oDiv.lastChild.getElementsByTagName("a")[0];
            delBtn.onclick = function() {
                var result = confirm("Are you sure you want to delete it?");
                if (result) {
                    oCar.removeChild(oDiv);
                    number--;
                    getAmount();
                }
            }
            var i_btn = document.getElementsByClassName("count_i");
            for (var k = 0; k < i_btn.length; k++) {
                i_btn[k].onclick = function() {
                    bt = this;
                    //获取小计节点
                    at = this.parentElement.parentElement.nextElementSibling;
                    //获取单价节点
                    pt = this.parentElement.parentElement.previousElementSibling;
                    //获取数量值
                    node = bt.parentNode.childNodes[1];
                    console.log(node);
                    num = node.innerText;
                    num = parseInt(num);
                    num++;
                    node.innerText = num;
                    //获取单价
                    price = pt.innerText;
                    price = price.substring(0, price.length +1 );
                    //计算小计值
                    at.innerText =  price * num ;
                    //计算总计值
                    getAmount();
                }
            }
            //获取所有的数量减号按钮
            var d_btn = document.getElementsByClassName("count_d");
            for (k = 0; k < i_btn.length; k++) {
                d_btn[k].onclick = function() {
                    bt = this;
                    //获取小计节点
                    at = this.parentElement.parentElement.nextElementSibling;
                    //获取单价节点
                    pt = this.parentElement.parentElement.previousElementSibling;
                    //获取c_num节点
                    node = bt.parentNode.childNodes[1];
                    num = node.innerText;
                    num = parseInt(num);
                    if (num > 1) {
                        num--;
                    }
                    node.innerText = num;
                    //获取单价
                    price = pt.innerText;
                    price = price.substring(0, price.length + 1);
                    //计算小计值     
                    at.innerText = price * num ;
                    //计算总计值
                    getAmount();
                }
            }
  
            delBtn.onclick = function() {
                var result = confirm("Are you sure you want to delete it?");
                if (result) {
                    oCar.removeChild(oDiv);
                    number--;
                    getAmount();
                }
            }
  
        }
    }
  
  }
  
  function getClass(oBox, tagname) {
    var aTag = oBox.getElementsByTagName("*");
    var aBox = [];
    for (var i = 0; i < aTag.length; i++) {
        if (aTag[i].className == tagname) {
            aBox.push(aTag[i]);
        }
    }
    return aBox;
  }
  
  var index = false;
  function checkAll() {
    var choose = document.getElementById("car").getElementsByTagName("i");
    // console.log(choose);
    if (choose.length != 1) {
        for (i = 1; i < choose.length; i++) {
            if (!index) {
                choose[0].classList.add("i_acity2")
                choose[i].classList.add("i_acity");
            } else {
                choose[i].classList.remove("i_acity");
                choose[0].classList.remove("i_acity2")
            }
        }
        index = !index;
    }
    getAmount();
  }
  
  //进行价格合计
  function getAmount() {
    // console.log(ys);
    ns = document.getElementsByClassName("i_acity");
    console.log(ns);
    sum = 0;
    //选中框
    document.getElementById("price_num").innerText = sum;
    for (y = 0; y < ns.length; y++) {
        //小计
        amount_info = ns[y].parentElement.parentElement.lastElementChild.previousElementSibling;
        num = parseInt(amount_info.innerText);
        sum += num;
        document.getElementById("price_num").innerText = sum;
    }
    }
})
