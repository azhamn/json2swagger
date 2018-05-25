var count = 1;
var pathList = new Array();

function expand(obj, path) {
    var e = path + "Col-2";
    for (let prop in obj) {
        let value = obj[prop];
        if (typeof value === 'object') {
            // document.getElementById(e).innerHTML += prop + " (object)<br>";
            expand(value, path);
        } else {
            // document.getElementById(e).innerHTML += prop + " (string)<br>";

            addInputElement(e, "checkbox", path + prop, "", prop);
            // addElement(e,"button","testButton","",null);
        }
    }

}

function createElement(elementTag, elementId, elementClass, html) {

    var newElement = document.createElement(elementTag);

    if (elementClass != null) {
        newElement.setAttribute('class', elementClass);
    }
    if (elementId != null) {
        newElement.setAttribute('id', elementId);
    }
    if (html != null) {
        newElement.innerHTML = html;
    }

    return newElement;
}

function addElement(parentId, elementTag, elementId, elementClass, html) {
    // Adds an element to the document

    // var p = document.getElementById(parentId);
    // var newElement = document.createElement(elementTag);
    // newElement.setAttribute('id', elementId);
    // newElement.setAttribute('class', elementClass);
    // newElement.innerHTML = html;
    // p.appendChild(newElement);

    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);

    if (elementClass != null) {
        newElement.setAttribute('class', elementClass);
    }
    if (elementId != null) {
        newElement.setAttribute('id', elementId);
    }
    if (html != null) {
        newElement.innerHTML = html;
    }

    p.appendChild(newElement);
}

function OuterHTML(element) {
    var container = document.createElement("div");
    container.appendChild(element.cloneNode(true));

    return container.innerHTML;
}

function addInputElement(parentId, type, elementId, elementClass, label) {
    //     elementId+=type;
    //     var p = document.getElementById(parentId);
    //     var newInputElement = document.createElement("input");
    //     newInputElement.setAttribute('type', type);
    //     newInputElement.setAttribute('id', elementId);
    //     newInputElement.setAttribute('class', elementClass);

    //     var l = document.createElement("label");
    //     l.innerHTML = label + ": ";
    //     l.appendChild(newInputElement);

    //    p.appendChild(l);
    //    p.innerHTML+="<br>";

    var p = document.getElementById(parentId);
    var l = createElement("label", null, null, label);

    var c1 = createElement("div", null, "col-sm-12", OuterHTML(l));
    var r1 = createElement("div", null, "row", OuterHTML(c1));

    var r2c1 = createElement("div", null, "col-sm-1", null);
    var r2c2 = createElement("div", null, "col-sm-11", null);

    r2c2.innerHTML += "Mandotory: ";

    var cb = createElement("input", null, null, null);
    cb.type = "checkbox";
    cb.setAttribute('id', elementId + "checkbox");
    r2c2.appendChild(cb);

    r2c2.innerHTML += "<br>Data Type: ";

    var selector = createElement("select", elementId + "select", "selectpicker", null);

    selector.appendChild(createElement("option", null, null, "String"));
    selector.appendChild(createElement("option", null, null, "Integer"));

    r2c2.appendChild(selector);

    r2c2.innerHTML += "<br>Description";

    var ta = createElement("textarea", null, "autoExpand", null);
    ta.setAttribute("rows", "2");
    ta.setAttribute("data-min-rows", "2");
    ta.setAttribute("style", "width:100%;resize: none;");
    ta.setAttribute("placeholder", "Enter description here...");

    r2c2.appendChild(ta);

    var r2 = createElement("div", null, "row", "");
    r2.appendChild(r2c1);
    r2.appendChild(r2c2);


    // var r3 = createElement("div", null, "row", "");
    // var r3c2 = createElement("div", null, "col-sm-11", null);

    // l2 = createElement("label", null, null, "Description:");
    // r3c2.appendChild(l2);

    // r3.appendChild(r2c1);
    // r3.appendChild(r3c2);

    p.appendChild(r1);
    p.appendChild(r2);
    // p.appendChild(r3);


    // addElement(p.id, "div", null, "row", OuterHTML(r1));

    // p.appendChild(l);
    // p.innerHTML += "<br>";

    // var newInputElement = document.createElement("input");
    // newInputElement.setAttribute('type', type);
    // newInputElement.setAttribute('id', elementId);
    // newInputElement.setAttribute('class', elementClass);


    // l.appendChild(newInputElement);


    // p.innerHTML += "<br>";

}

function showError(inputID, ErrorLabel) {
    var errorLabelID = inputID + "ErrorLabel";
    document.getElementById(errorLabelID).innerText = ErrorLabel;
}

function deletePath(a) {
    var response = confirm("Are you sure you want to delete " + a + "?");
    if (response) {
        var elem = document.getElementById(a + "Path");
        elem.parentNode.removeChild(elem);
        pathList.pop(a);
    }
}

function addPath() {
    var trailingSlash = new RegExp("\/$");
    console.log(document.getElementById("pathSpecifier").value.trim());
    if (document.getElementById("pathSpecifier").value.trim() == "") {
        document.getElementById("pathSpecifierErrorLabel").innerText = "Cannot be empty";
        return;
    }
    if (trailingSlash.test(document.getElementById("pathSpecifier").value.trim())) {
        document.getElementById("pathSpecifierErrorLabel").innerText = "Path cannot have trailing slash";
        return;
    }

    var path = document.getElementById("pathSpecifier").value.trim();
    console.log(pathList.indexOf(path));
    if (pathList.indexOf(path) >= 0) {
        showError("pathSpecifier", "Path already specified");
        return;
    } else {
        pathList.push(path);
    }


    var h = "<div class=\"panel-heading\"> \n \
    <div class=\"row\">\
      <div class=\"col-sm-11\"> \
        <h4 class=\"panel-title\">\n  \
          <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse" + count + "\">" + path + "</a>\n  \
        </h4>\
      </div>\
      <div class=\"col-sm-1\">\n  \
        <i onclick=\"deletePath(\'" + path + "\')\" class=\"pull-right fa fa-trash-o panelCloseButton\" aria-hidden=\"true\"></i>\n \
      </div>\
    </div> \
  </div > \
  <div id=\"collapse" + count + "\" class=\"panel-collapse collapse in\"> \n \
  <div class=\"panel-body\"> \n \
  <div class=\"row\"> \
    <form id=\"" + path + "form\">\n \
    <div id=\"" + path + "Col-1\" class=\"col-sm-6\"> \
    <textarea id=\"" + path + "JsonInput\" class='autoExpand' rows='5' data-min-rows='5' placeholder=\"Enter payload here\" form=\"json\" style=\"width:100%;resize: none;\">\n \
    </textarea>\n \
    </br>\n \
    <button class=\"button\" onclick=\"myFunction(\'" + path + "\')\" type=\"button\" style=\"width:100%;\">Parse</button>\n \
    </div>\
    <div id=\"" + path + "Col-2\" class=\"col-sm-6\"> \
    </div> \
</div> \
    </form> \n \
    </div>\
  </div>\
  </div>";
    addElement("paths", "div", path + "Path", "panel panel-default", h);
    count++;

    document.getElementById(path + "JsonInput").innerHTML = "{\r\n\t\"subscription\": {\r\n\t\t\"criteria\": \"SSH\",\r\n\t\t\"destinationAddress\": \"3456\",\r\n\t\t\"clientCorrelator\": \"123456:AIN12345\"\r\n\t}\r\n}";

    addResizeTextAreaListener();

}

function clearErrorMessage(a) {
    document.getElementById(a + "ErrorLabel").innerText = "";
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        console.log("Invalid JSON String");
        return false;
    }
    return true;
}

function myFunction(path) {
    var a = document.getElementById(path + "JsonInput").value;
    if (IsJsonString(a)) {

        var json = JSON.parse(a);
        document.getElementById(path + "JsonInput").value = JSON.stringify(json, null, "\t");
        document.getElementById(path + "JsonInput").style.height = 'auto';
        document.getElementById(path + "JsonInput").style.height = (document.getElementById(path + "JsonInput").scrollHeight) + 'px';
        document.getElementById(path + "Col-2").innerHTML = "";
        console.log(path);
        expand(json, path);
    }
    else {
        document.getElementById(path + "Col-2").innerHTML = "";
    }

}

// To add the event listener to adjust the text area dynamically according to the data
function addResizeTextAreaListener() {

    var tx = document.getElementsByTagName('textarea');

    for (var i = 0; i < tx.length; i++) {
        tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;width:100%;resize:none;');
        tx[i].addEventListener("input", resizeTextArea, false);
    }

    function resizeTextArea() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    }

}

function createFormElement() {
    document.write("testing testing testing");
}