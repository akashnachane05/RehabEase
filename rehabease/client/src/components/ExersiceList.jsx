import ExerciseCard from "../components/ExerciseCard"
const ExerciseList = ({ recommendations }) => {
    console.log("Recommendations in ExerciseList:", recommendations);
  
    if (recommendations.length === 0) {
      return <p>No recommendations found.</p>;
    }
  
    return (
      <div >
        {recommendations.map((category) => (
          <div key={category._id}>
            <h1><strong >{category.category}</strong></h1> {/* Category Name */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 flex ">
                {category.exercises.map((exercise) => (
                    <ExerciseCard key={exercise._id} exercise={exercise} />
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  
  export default ExerciseList;