var count = 1;
var pathList = new Array();
function expand(obj) {

    for (prop in obj) {
        value = obj[prop];
        if (typeof value === 'object') {
            document.getElementById("output").innerHTML += prop + " (object)<br>";
            expand(value);
        } else {
            document.getElementById("output").innerHTML += prop + " (string)<br>";
        }
    }

}

function addElement(parentId, elementTag, elementId, elementClass, html) {
    // Adds an element to the document

    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.setAttribute('class', elementClass);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

function showError(inputID, ErrorLabel) {
    var errorLabelID = inputID + "ErrorLabel";
    document.getElementById(errorLabelID).innerText = ErrorLabel;
}

function deletePath(a){
  var response =  confirm("Are you sure you want to delete " + a + "?");
  if(response){
    var elem = document.getElementById(a+"Path");
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
          <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse" +count+ "\">"+path+"</a>\n  \
        </h4>\
      </div>\
      <div class=\"col-sm-1\">\n  \
        <i onclick=\"deletePath(\'"+ path + "\')\" class=\"pull-right fa fa-trash-o panelCloseButton\" aria-hidden=\"true\"></i>\n \
      </div>\
    </div> \
  </div > \
  <div id=\"collapse"+ count + "\" class=\"panel-collapse collapse in\"> \n \
  <div class=\"panel-body\"> \n \
    <form id=\""+ path + "form\">\n \
    <textarea id=\""+ path + "JsonInput\" placeholder=\"Enter payload here\" form=\"json\" style=\"width:500px; height:200px;\">\n \
    {\n \
    \"subscription\":{\n \
    \"criteria\":\"SSH\",\n \
    \"destinationAddress\":\"3456\",\n \
    \"clientCorrelator\":\"123456:AIN12345\"\n \
    }\n \
    }\n \
    </textarea>\n \
    </br>\n \
    <button class=\"button\" onclick=\"myFunction(\'"+ path + "\')\" type=\"button\">Parse</button>\n \
    </form> \n \
  </div>\
  </div>";
    addElement("paths", "div", path+"Path", "panel panel-default", h);
    count++;
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
        document.getElementById("output").innerHTML = "";
        expand(json);
    }
    else {
        document.getElementById("output").innerHTML = "";
    }
}