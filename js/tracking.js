(function(){
    $(document).ready(init);
    var firebaseConfig = {
        apiKey: "AIzaSyA2_P07vxDtJ9OoKN1OkXAFpMnuxOoZa7o",
        authDomain: "pointology-e397b.firebaseapp.com",
        databaseURL: "https://pointology-e397b.firebaseio.com",
        projectId: "pointology-e397b",
        storageBucket: "pointology-e397b.appspot.com",
        messagingSenderId: "404283995990",
        appId: "1:404283995990:web:fa100e3015ce504f2648f7"
    };

    function init(){
        firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                let i = 0;
                let userUid = user.uid
                firebase.database().ref("Admin/MensEntries/").on("child_added", (snapshot) => {
                    let data = snapshot.val();
                    let uid = data.UID
        
                    firebase.database().ref("Users/" + uid + "/Entries").once("value", (snapshot) => {
                        let dataTwo = snapshot.val();
        
                        let div = document.createElement("div");
                        div.id = dataTwo.MensScore;
                        div.classList.add("col");
                        div.classList.add("m12");
                        div.classList.add("a" + uid);
                        if(uid === userUid){
                            $(div).css("border", "solid 2px green");
                            $(div).css("background-color", "rgba(144, 283, 144, .3");
                        }
                        $(div).css("padding-bottom", "50px");
        
                        let place = document.createElement("h5");
                        place.textContent = "1";
                        place.classList.add("col");
                        place.classList.add("m1");
                        place.classList.add("place");
                        place.classList.add("center-align");
                        $(place).css("font-weight", "600");
                        div.appendChild(place);
                        
                        let name = document.createElement("h5");
                        name.classList.add("col");
                        name.classList.add("m7");
                        $(name).css("font-weight", "600");
                        // name.classList.add("center-align")
        
                        firebase.database().ref("Users/" + uid + "/Info").on("value", (snapshot) => {
                            let dataThree = snapshot.val();
                            name.textContent = dataThree.FirstName + " " + dataThree.LastName;
                        });
        
                        div.appendChild(name);

                        let a = document.createElement("a");
                        a.textContent = "View Teams";
                        a.href = "#modal" + i;
                        a.classList.add("col");
                        a.classList.add("m2");
                        a.classList.add("teamViewBtn");
                        a.classList.add("modal-trigger");
                        div.appendChild(a);

                        let modalDiv = document.createElement("div");
                        modalDiv.classList.add("modal");
                        modalDiv.id = "modal" + i;
                        div.appendChild(modalDiv);

                        let modalContentDiv = document.createElement("div");
                        modalContentDiv.classList.add("modal-content");
                        modalDiv.appendChild(modalContentDiv);

                        let modalTitle = document.createElement("h4");
                        modalTitle.textContent = "Chosen Teams: ";
                        modalContentDiv.appendChild(modalTitle);

                        for(let i = 0; i < dataTwo.MensEntry.length; i++){
                            let p = document.createElement("p");
                            p.textContent = dataTwo.MensEntry[i] + " ";
                            p.classList.add("col");
                            p.classList.add("m3");
                            p.classList.add("team");
                            p.classList.add("center-align")
                            modalContentDiv.appendChild(p);
                        }
        
                        let score = document.createElement("h5");
                        score.classList.add("col");
                        score.classList.add("m2");
                        score.classList.add("center-align");
                        score.classList.add("score");
                        score.textContent = dataTwo.MensScore;
                        $(score).css("font-weight", "600");
                        div.appendChild(score)

                        let hr = document.createElement("hr");
                        hr.classList.add("col");
                        hr.classList.add("m11");
                        hr.classList.add("offset-m1");
                        div.appendChild(hr);

                        // let teamDiv = document.createElement("div");
                        // teamDiv.classList.add("col");
                        // teamDiv.classList.add("m12");
                        // teamDiv.classList.add("teamList");
                        // div.appendChild(teamDiv);
        
                        $("#mens").append(div);
                        
                        let container = document.getElementById("mens");
                        let elements = container.childNodes;
                        // temporary storage for elements which will be sorted
                        let sortMe = [];
                        // iterate through all elements in <div id="list">
                        for (let i = 0; i < elements.length; i++) {
                            // skip nodes without an ID, comment blocks for example
                            if (!elements[i].id) {
                                continue;
                            }
        
                            let sortPart = elements[i].id
                            sortMe.push([ 1 * sortPart , elements[i] ]);
                        }

                        // sort the array sortMe, elements with the highest ID will be first
                        sortMe.sort(function(x, y) {
                            // remember that the first array element is the number, used for comparison
                            return y[0] - x[0];
                        });
                        // finally append the sorted elements again, the old element will be moved to
                        // the new position
                        let x = 1;
                        for (let i = 0; i < sortMe.length; i++) {
                            // remember that the second array element contains the element itself
                            let classSplit = sortMe[i][1].className.split("col m12 ");
                            if(i != 0){
                                if(sortMe[i - 1][1].id == sortMe[i][1].id){
                                    document.querySelector("." + classSplit[1] + " .place").textContent = x;
                                }else{
                                    x++;
                                    document.querySelector("." + classSplit[1] + " .place").textContent = x;
                                }
                            }
                            container.appendChild(sortMe[i][1]);
                        }

                        i++;
                        $('.modal').modal();
                    });
                });

                // =============== WOMENS ======================

                firebase.database().ref("Admin/WomensEntries/").on("child_added", (snapshot) => {
                    let data = snapshot.val();
                    let uid = data.UID
        
                    firebase.database().ref("Users/" + uid + "/Entries").once("value", (snapshot) => {
                        let dataTwo = snapshot.val();
        
                        let div = document.createElement("div");
                        div.id = dataTwo.WomensScore;
                        div.classList.add("col");
                        div.classList.add("m12");
                        div.classList.add("a" + uid);
                        if(uid === userUid){
                            $(div).css("border", "solid 2px green");
                            $(div).css("background-color", "rgba(144, 283, 144, .3");
                        }
                        $(div).css("padding-bottom", "50px");
        
                        let place = document.createElement("h5");
                        place.textContent = "1";
                        place.classList.add("col");
                        place.classList.add("m1");
                        place.classList.add("placew");
                        place.classList.add("center-align");
                        $(place).css("font-weight", "600");
                        div.appendChild(place);
                        
                        let name = document.createElement("h5");
                        name.classList.add("col");
                        name.classList.add("m7");
                        $(name).css("font-weight", "600");
                        // name.classList.add("center-align")
        
                        firebase.database().ref("Users/" + uid + "/Info").on("value", (snapshot) => {
                            let dataThree = snapshot.val();
                            name.textContent = dataThree.FirstName + " " + dataThree.LastName;
                        });
        
                        div.appendChild(name);

                        let a = document.createElement("a");
                        a.textContent = "View Teams";
                        a.href = "#modalw" + i;
                        a.classList.add("col");
                        a.classList.add("m2");
                        a.classList.add("teamViewBtn");
                        a.classList.add("modal-trigger");
                        div.appendChild(a);

                        let modalDiv = document.createElement("div");
                        modalDiv.classList.add("modal");
                        modalDiv.id = "modalw" + i;
                        div.appendChild(modalDiv);

                        let modalContentDiv = document.createElement("div");
                        modalContentDiv.classList.add("modal-content");
                        modalDiv.appendChild(modalContentDiv);

                        let modalTitle = document.createElement("h4");
                        modalTitle.textContent = "Chosen Teams: ";
                        modalContentDiv.appendChild(modalTitle);

                        for(let i = 0; i < dataTwo.WomensEntry.length; i++){
                            let p = document.createElement("p");
                            p.textContent = dataTwo.WomensEntry[i] + " ";
                            p.classList.add("col");
                            p.classList.add("m3");
                            p.classList.add("team");
                            p.classList.add("center-align")
                            modalContentDiv.appendChild(p);
                        }
        
                        let score = document.createElement("h5");
                        score.classList.add("col");
                        score.classList.add("m2");
                        score.classList.add("center-align");
                        score.classList.add("score");
                        score.textContent = dataTwo.WomensScore;
                        $(score).css("font-weight", "600");
                        div.appendChild(score)

                        let hr = document.createElement("hr");
                        hr.classList.add("col");
                        hr.classList.add("m11");
                        hr.classList.add("offset-m1");
                        div.appendChild(hr);

                        // let teamDiv = document.createElement("div");
                        // teamDiv.classList.add("col");
                        // teamDiv.classList.add("m12");
                        // teamDiv.classList.add("teamList");
                        // div.appendChild(teamDiv);

                        // for(let i = 0; i < dataTwo.WomensEntry.length; i++){
                        //     let p = document.createElement("p");
                        //     p.textContent = dataTwo.WomensEntry[i] + " ";
                        //     p.classList.add("col");
                        //     p.classList.add("m3");
                        //     p.classList.add("team");
                        //     p.classList.add("center-align")
                        //     teamDiv.appendChild(p);
                        // }
        
                        $("#womens").append(div);
                        
                        let container = document.getElementById("womens");
                        let elements = container.childNodes;
                        // temporary storage for elements which will be sorted
                        let sortMe = [];
                        // iterate through all elements in <div id="list">
                        for (let i = 0; i < elements.length; i++) {
                            // skip nodes without an ID, comment blocks for example
                            if (!elements[i].id) {
                                continue;
                            }
        
                            let sortPart = elements[i].id
                            sortMe.push([ 1 * sortPart , elements[i] ]);
                        }

                        // sort the array sortMe, elements with the highest ID will be first
                        sortMe.sort(function(x, y) {
                            // remember that the first array element is the number, used for comparison
                            return y[0] - x[0];
                        });
                        // finally append the sorted elements again, the old element will be moved to
                        // the new position
                        for (let i = 0; i < sortMe.length; i++) {
                            // remember that the second array element contains the element itself
                            let classSplit = sortMe[i][1].className.split("col m12 ");
                            document.querySelector("." + classSplit[1] + " .placew").textContent = (i + 1);
                            container.appendChild(sortMe[i][1]);
                        }
                    });
                });
            }
        })

        $(".tabs").tabs();
        $("#logout").on("click", logout);
        $('.modal').modal();
    }

    function logout(){
        firebase.auth().signOut().then(() => {
            location.replace("../html/index.html");
        });    
    }
})();