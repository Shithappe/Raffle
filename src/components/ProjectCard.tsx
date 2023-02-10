import web from "../assets/safari.png";
import twitter from "../assets/twitter.png";
import discord from "../assets/discord_2.png";

function ProjectCard(data:any) {

    function hendleSelect(e:any){
        data.setSelectedProject(data.data);
        let element = e.target;
        while (!element.classList.contains('projectCard')) {
            element = element.parentNode;
        }
        let foo = document.getElementsByClassName("selectedProject");
        for (var i = 0; i < foo.length; i++) foo[i].classList.remove("selectedProject");

        element.classList.add("selectedProject");
    }
    
    return (
        <div onClick={hendleSelect} className="projectCard">
            <div className="projectCard_title">
                <img src={data.data.icon} alt="" />
                <div>
                    <h3>{data.data.title}</h3>
                    <div className="block_categories_in_card">
                        <div className="categories_in_card">{data.data.category[0].name}</div>
                    </div>
                </div>
            </div>
            <p>{data.data.excerpt}</p>
            <div className="project_social_media">
                <a target="_blank" href="#"><img src={web} alt="" /></a>
                <a target="_blank" href="#"><img src={twitter} alt="" /></a>
                <a target="_blank" href="#"><img src={discord} alt="" /></a>
            </div>
        </div>
    )
}

export default ProjectCard