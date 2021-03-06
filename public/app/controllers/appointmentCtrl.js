angular.module('appointmentControllers', ['appointmentServices'])

  //Control appointment page
  .controller('appointmentCtrl', function ($scope, $timeout, $location, $filter, Appoint) {
    var app = this;

    //Get data from webpage and address them as database format
    app.setShoppingCart = function (shopData) {
      var services = getShoppinglist();
      var l_shopData = app.shopData;
      //date format: split the date and time to two fields
      if (l_shopData.startfm) {
        l_shopData.FromDate = $filter('date')(l_shopData.startfm, "MM/dd/yyyy");
        l_shopData.FromTime = $filter('date')(l_shopData.startfm, "shortTime");
        delete l_shopData['startfm']
      }
      if (l_shopData.endat) {
        l_shopData.ToDate = $filter('date')(l_shopData.endat, "MM/dd/yyyy");
        l_shopData.ToTime = $filter('date')(l_shopData.endat, "shortTime");
        delete l_shopData['endat']
      }

      //Staff gender requirement
      if (l_shopData.SittingType == '0') {
        delete l_shopData['SittingType'];
      }
      if (l_shopData.male == undefined && l_shopData.female == undefined) {
        l_shopData.staffGender = 'Both';
      } else {
        if (l_shopData.male && l_shopData.female) {
          l_shopData.staffGender = 'Both';
          delete l_shopData['male'];
          delete l_shopData['female'];
        } else {
          if (l_shopData.male) {
            l_shopData.staffGender = 'Male';
            delete l_shopData['male'];
          };
          if (l_shopData.female) {
            l_shopData.staffGender = 'Female';
            delete l_shopData['female'];

          }

        }
      }

      l_shopData['services'] = services;

      // Call function to save the appointment data into local
      Appoint.setAppoint(l_shopData);

      //move to checkout page
      $timeout(function () {
        $location.path('/checkout');
        l_shopData = '';
      }, 50);


    };

    app.checkout = function (username) {
      var appointServices = {};
      //Get appointment data from local storage
      appointServices['services'] = Appoint.getAppoint()
      console.log(appointServices);
      if (appointServices['services']) {
        appointServices['username'] = username;

        //save data to database
        Appoint.saveServices(appointServices).then(function (data) {
          if (data.data.success) {
            app.successMsg = data.data.message;
            console.log(app.successMsg);

            //When success, display the success.html
            $timeout(function () {
              $location.path('/success');
              app.shopData = '';
            }, 50);

          } else {
            app.errorMsg = data.data.message;
            console.log(app.errorMsg);
          }
        });
      }
    }

    app.add_shoppingcar = function (index) {
      var table = document.getElementById("list");
      var trs = table.getElementsByTagName("tr");
      var tr = trs[index];
      var tds = tr.getElementsByTagName("td");
      var name = tds[0].innerHTML;
      var price = tds[1].innerHTML;
      var tbody = document.getElementById("goods");
      var row = tbody.insertRow();
      row.innerHTML = "<td>" + name + "</td>" +
        // "<td>" + price + "</td>" +
        // "<td align='center'>" +
        // "<input type='button' value='-' id='jian'  onclick='change(this,-1)'  />" +
        // "<input id='text' type='text' size='1' value='1' readonly='readonly' />" +
        // "<input type='button' value='+' id='add'  onclick='change(this,1)'  />" +
        // "</td>" +
        "<td>" + price + "</td>" +
        "<td align='center'>" +
        // "<input type='button' value='X' onclick='del(this)'/>" +
        '<a href="javascript:;">X</a>'
      "</td>" +
        "</tr>"
      total();

      var delBtn = row.lastChild.getElementsByTagName("a")[0];
      delBtn.onclick = function () {
        var result = confirm("Are you sure you want to delete it?");
        if (result) {
          tbody.removeChild(row);
          total();
        }
      }
    }

    function total() {
      var tbody = document.getElementById("goods");
      var trs = tbody.getElementsByTagName("tr");
      var sum = 0;
      for (var i = 0; i < trs.length; i++) {
        var tds = trs[i].getElementsByTagName("td");
        var m = tds[1].innerHTML;
        sum += parseFloat(m);
      }
      var total = document.getElementById("total");
      total.innerHTML = sum;
    }

    function getShoppinglist() {
      var tbody = document.getElementById("goods");
      var trs = tbody.getElementsByTagName("tr");
      var sum = 0;
      var shopList = [];
      for (var i = 0; i < trs.length; i++) {
        var tds = trs[i].getElementsByTagName("td");
        var ser = 'service' + i.toString();
        var m = tds[1].innerHTML;
        shopList.push({ service: tds[0].innerHTML });
        sum += parseFloat(m);
      }
      if (shopList) {
        return { 'Carts': shopList, 'Total': sum };
      }

    }
    // //to change the quantity
    // function change(btn, n) {
    //   //to get the quantity
    //   var inputs = btn.parentNode.getElementsByTagName("input");
    //   //to get the original quantity
    //   var amount = parseInt(inputs[1].value);

    //   //use n<0 to express we minus the button
    //   if (amount <= 1 && n < 0) {
    //     return;
    //   }
    //   //change the qty according to plus or minus button
    //   inputs[1].value = amount + n;
    //   //combine changed qty with amts
    //   amount = inputs[1].value;
    //   //get all rows
    //   var tr = btn.parentNode.parentNode;
    //   //get all columns
    //   var tds = tr.getElementsByTagName("td");
    //   //get the price
    //   var price = parseFloat(tds[1].innerHTML);

    //   var m = price * amount;

    //   tds[3].innerHTML = m;

    //   total();
    // }

    // function del(i) {
    //   var tr = i.parentNode.parentNode;
    //   tr.parentNode.removeChild(tr);
    //   //tr.remove(tr);
    //   total();
    // }
  })