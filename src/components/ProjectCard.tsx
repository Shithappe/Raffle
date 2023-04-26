interface ProjectCardProps {
    data: any;
    setSelectedProject: any;
  }

function ProjectCard({ data, setSelectedProject }: ProjectCardProps) {

    function hendleSelect(e:any){
        setSelectedProject(data);
        let element = e.target;
        while (!element.classList.contains('projectCard')) {
            element = element.parentNode;
        }
        let foo = document.getElementsByClassName("selectedProject");
        for (var i = 0; i < foo.length; i++) foo[i].classList.remove("selectedProject");

        element.classList.add("selectedProject");
    }
    
    return (
        <div onClick={hendleSelect} className="projectCard" style={{
            background: `linear-gradient(to right, #FFD700 ${data.percent}%, #FFFFFF 0%)`
          }}>
            <div className="projectCard_title">
                <img src={data.icon} alt="" />
                <div className="w-100">
                    <h3>{data.title} </h3>
                    <div className="block_categories_in_card">
                        <div className="categories_in_card">{data.category[0].name}</div>
                        { data.percent !== undefined && <div>{data.percent}%</div> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard