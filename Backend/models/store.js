const Exercise = require('./models/Exercise');

const exerciseData = {
    "patient_symptoms":[
          "Shoulder Pain",
          "i am having shoulder pain and the high pain in shoulder",
          "Swelling near the shoulder area ",
          "Weakness in the shoulder",
          "Weakness in the arm",
          "Stiffness in the shoulder",
          "Discomfort while lifting or reaching overhead",
          "Instability or a feeling of weakness in the shoulder joint",
          "Numbness or tingling in the shoulder or arm"
    ],
    "The Shoulder Rehabilitation": [
      
      {
        name: "Pendulum Swings",
        description: "Gentle exercise to increase shoulder mobility post-injury or surgery.",
        video: "https://www.youtube.com/watch?v=S4H_rZA2kSM",
        sets: 3,
        reps: 10,
        symptoms: [
          "Shoulder Pain",
          "Range of motion (restriction, tightness)",
          "Swelling",
          "Weakness in the shoulder or arm",
          "Stiffness",
          "Discomfort while lifting or reaching overhead",
          "Instability or a feeling of weakness in the shoulder joint",
          "Numbness or tingling in the shoulder or arm"
        ],
        patient_symptoms:[
          "Shoulder Pain",
          "i am having shoulder pain and the high pain in shoulder",
          "Swelling near the shoulder area ",
          "Weakness in the shoulder",
          "Weakness in the arm",
          "Stiffness in the shoulder",
          "Discomfort while lifting or reaching overhead",
          "Instability or a feeling of weakness in the shoulder joint",
          "Numbness or tingling in the shoulder or arm"
    ],

      },
      {
        name: "Shoulder External Rotation with Resistance Band",
        description: "Strengthens the rotator cuff muscles to improve shoulder stability.",
        video: "https://www.youtube.com/watch?v=YMytSEYr2yU",
        sets: 3,
        reps: 15,
        symptoms: [
          "Weakness in the shoulder or arm",
          "Range of motion (restriction, tightness)",
          "Stiffness",
          "Discomfort while lifting or reaching overhead",
          "Instability or a feeling of weakness in the shoulder joint"
        ],
        patient_symptoms:[
          "Shoulder Pain",
          "i am having shoulder pain and the high pain in shoulder",
          "Swelling near the shoulder area ",
          "Weakness in the shoulder",
          "Weakness in the arm",
          "Stiffness in the shoulder",
          "Discomfort while lifting or reaching overhead",
          "Instability or a feeling of weakness in the shoulder joint",
          "Numbness or tingling in the shoulder or arm"
    ],

      },
      {
        name: "Wall Slides",
        description: "Enhances shoulder flexibility and range of motion.",
        video: "https://www.youtube.com/watch?v=QVyMMFR6hec",
        sets: 3,
        reps: 12,
        symptoms: [
          "Range of motion (restriction, tightness)",
          "Swelling",
          "Weakness in the shoulder or arm",
          "Stiffness",
          "Instability or a feeling of weakness in the shoulder joint"
        ],
        patient_symptoms:[
          "Shoulder Pain",
          "i am having shoulder pain and the high pain in shoulder",
          "Swelling near the shoulder area ",
          "Weakness in the shoulder",
          "Weakness in the arm",
          "Stiffness in the shoulder",
          "Discomfort while lifting or reaching overhead",
          "Instability or a feeling of weakness in the shoulder joint",
          "Numbness or tingling in the shoulder or arm"
    ],

      }
    ],
    "Knee Rehabilitation": [
      {
        name: "Straight Leg Raises",
        description: "Strengthens the quadriceps without bending the knee.",
        video: "https://www.youtube.com/watch?v=Vq_S9BR01Ug",
        sets: 3,
        reps: 15,
        symptoms: [
          "Swelling",
          "Limited knee flexion (difficulty bending the knee)",
          "Weakness in the quadriceps or hamstrings",
          "Stiffness or tightness in the knee",
          "Instability or feeling of knee 'giving way'",
          "Tenderness around the knee joint"
        ],
        patient_symptoms: [
          "Swelling",
          "Limited knee flexion",
          "difficulty bending the knee)",
          "Weakness in the quadriceps or hamstrings",
          "Stiffness or tightness in the knee",
          "Instability or feeling of knee 'giving way'",
          "Tenderness around the knee joint"
        ]
      },
      {
        name: "Quadriceps Sets",
        description: "Isometric exercise to activate and strengthen the quadriceps.",
        video: "https://www.youtube.com/watch?v=Vq_S9BR01Ug",
        sets: 3,
        reps: 10,
        symptoms: [
          "Swelling",
          "Weakness in the quadriceps",
          "Tenderness around the knee joint"
        ],
        patient_symptoms: [
          "Swelling",
          "Limited knee flexion",
          "difficulty bending the knee)",
          "Weakness in the quadriceps or hamstrings",
          "Stiffness or tightness in the knee",
          "Instability or feeling of knee 'giving way'",
          "Tenderness around the knee joint"
        ]

      },
      {
        name: "Heel Slides",
        description: "Improves knee flexion range of motion post-surgery or injury.",
        video: "https://www.youtube.com/watch?v=Vq_S9BR01Ug",
        sets: 3,
        reps: 12,
        symptoms: [
          "Limited knee flexion (difficulty bending the knee)",
          "Swelling",
          "Weakness in the quadriceps or hamstrings",
          "Stiffness or tightness in the knee"
        ],
        patient_symptoms: [
          "Swelling",
          "Limited knee flexion",
          "difficulty bending the knee)",
          "Weakness in the quadriceps or hamstrings",
          "Stiffness or tightness in the knee",
          "Instability or feeling of knee 'giving way'",
          "Tenderness around the knee joint"
        ]
        
      }
    ],
    "Hip Rehabilitation": [
      {
        name: "Clamshells",
        description: "Targets hip abductors to improve hip stability.",
        video: "https://www.youtube.com/watch?v=cLQcXGYKigg",
        sets: 3,
        reps: 15,
        symptoms: [
          "Limited range of motion (e.g., difficulty moving the hip outward or inward)",
          "Weakness in the hip or thigh muscles",
          "Stiffness or tightness in the hip joint",
          "Instability or a feeling of hip dislocation",
          "Pain during walking or weight-bearing"
        ],
        patient_symptoms: [
          "Limited range of motion (e.g., difficulty moving the hip outward or inward)",
          "Weakness in the hip or thigh muscles",
          "Stiffness or tightness in the hip joint",
          "Instability or a feeling of hip dislocation",
          "Pain during walking or weight-bearing"
        ]
      },
      {
        name: "Side-Lying Leg Raises",
        description: "Strengthens hip abductors and improves lateral hip movement.",
        video: "https://www.youtube.com/watch?v=cLQcXGYKigg",
        sets: 3,
        reps: 12,
        symptoms: [
          "Limited range of motion (difficulty moving the hip outward or inward)",
          "Weakness in the hip or thigh muscles",
          "Stiffness or tightness in the hip joint",
          "Instability or a feeling of hip dislocation"
        ],
        patient_symptoms: [
          "Limited range of motion (e.g., difficulty moving the hip outward or inward)",
          "Weakness in the hip or thigh muscles",
          "Stiffness or tightness in the hip joint",
          "Instability or a feeling of hip dislocation",
          "Pain during walking or weight-bearing"
        ]
      },
      {
        name: "Hip Flexor Stretches",
        description: "Enhances flexibility of the hip flexor muscles.",
        video: "https://www.youtube.com/watch?v=cLQcXGYKigg",
        sets: 3,
        reps: 10,
        symptoms: [
          "Stiffness or tightness in the hip joint",
          "Weakness in the hip or thigh muscles",
          "Pain during walking or weight-bearing"
        ],
        patient_symptoms: [
          "Limited range of motion (e.g., difficulty moving the hip outward or inward)",
          "Weakness in the hip or thigh muscles",
          "Stiffness or tightness in the hip joint",
          "Instability or a feeling of hip dislocation",
          "Pain during walking or weight-bearing"
        ]
      }
    ],
    "Ankle and Foot Rehabilitation": [
      {
        name: "Ankle Pumps",
        description: "Improves circulation and prevents stiffness in the ankle joint.",
        video: "https://www.youtube.com/watch?v=PLVFCd_4qJSQK3f_mbroW8EjKWXeNpL6JU",
        sets: 3,
        reps: 20,
        symptoms: [
          "Swelling or edema around the ankle or foot",
          "Weakness or instability when standing or walking",
          "Difficulty moving toes or foot (lack of mobility)",
          "Tightness in the ankle joint",
          "Numbness or tingling sensation in the foot or ankle"
        ],
        patient_symptoms: [
          "Swelling or edema around the ankle or foot",
          "Weakness or instability when standing or walking",
          "Difficulty moving toes or foot (lack of mobility)",
          "Tightness in the ankle joint",
          "Numbness or tingling sensation in the foot or ankle"
        ]
      },
      {
        name: "Toe Curls with a Towel",
        description: "Strengthens the intrinsic muscles of the foot.",
        video: "https://www.youtube.com/watch?v=PLVFCd_4qJSQK3f_mbroW8EjKWXeNpL6JU",
        sets: 3,
        reps: 15,
        symptoms: [
          "Weakness or instability when standing or walking",
          "Difficulty moving toes or foot (lack of mobility)"
        ],
        patient_symptoms: [
          "Swelling or edema around the ankle or foot",
          "Weakness or instability when standing or walking",
          "Difficulty moving toes or foot (lack of mobility)",
          "Tightness in the ankle joint",
          "Numbness or tingling sensation in the foot or ankle"
        ]
      },
      {
        name: "Standing Heel Raises",
        description: "Strengthens the calf muscles and improves ankle stability.",
        video: "https://www.youtube.com/watch?v=PLVFCd_4qJSQK3f_mbroW8EjKWXeNpL6JU",
        sets: 3,
        reps: 15,
        symptoms: [
          "Swelling or edema around the ankle or foot",
          "Weakness or instability when standing or walking",
          "Difficulty balancing on one foot"
        ],
        patient_symptoms: [
          "Swelling or edema around the ankle or foot",
          "Weakness or instability when standing or walking",
          "Difficulty moving toes or foot (lack of mobility)",
          "Tightness in the ankle joint",
          "Numbness or tingling sensation in the foot or ankle"
        ]
      }
    ],
    "Core and Back Rehabilitation": [
      {
        name: "Bird-Dog Exercise",
        description: "Enhances core stability and spinal alignment.",
        video: "https://www.youtube.com/watch?v=dqIWBBtYMuo",
        sets: 3,
        reps: 10,
        symptoms: [
          "Back pain",
          "Weakness in the core or lower back muscles",
          "Stiffness or tightness in the spine or abdomen",
          "Limited spinal mobility (difficulty bending or twisting)",
          "Muscle spasms in the lower back"
        ],
        patient_symptoms: [
          "Back pain",
          "Weakness in the core or lower back muscles",
          "Stiffness or tightness in the spine or abdomen",
          "Limited spinal mobility (difficulty bending or twisting)",
          "Muscle spasms in the lower back"
        ]
      },
      {
        name: "Pelvic Tilts",
        description: "Improves lower back flexibility and reduces pain.",
        video: "https://www.youtube.com/watch?v=dqIWBBtYMuo",
        sets: 3,
        reps: 15,
        symptoms: [
          "Back pain",
          "Weakness in the core or lower back muscles",
          "Stiffness or tightness in the spine or abdomen",
          "Difficulty maintaining posture while standing or sitting"
        ],
        patient_symptoms: [
          "Back pain",
          "Weakness in the core or lower back muscles",
          "Stiffness or tightness in the spine or abdomen",
          "Limited spinal mobility (difficulty bending or twisting)",
          "Muscle spasms in the lower back"
        ]
      },
      {
        name: "Seated Back Extensions",
        description: "Strengthens the lower back muscles.",
        video: "https://www.youtube.com/watch?v=dqIWBBtYMuo",
        sets: 3,
        reps: 12,
        symptoms: [
          "Back pain",
          "Weakness in the core or lower back muscles",
          "Muscle spasms in the lower back"
        ],
        patient_symptoms: [
          "Back pain",
          "Weakness in the core or lower back muscles",
          "Stiffness or tightness in the spine or abdomen",
          "Limited spinal mobility (difficulty bending or twisting)",
          "Muscle spasms in the lower back"
        ]
      }
    ],
    "Cardiac Rehabilitation": [
      {
        name: "Low-Impact Aerobics",
        description: "Improves cardiovascular fitness safely post-cardiac events.",
        video: "https://www.youtube.com/watch?v=-JsuNKbAAkU",
        sets: 1,
        reps:12,
        symptoms: [
          "Shortness of breath (during activity or at rest)",
          "Chest pain or discomfort",
          "Fatigue or tiredness after physical exertion",
          "Dizziness or lightheadedness",
          "Rapid or irregular heart rate"
        ],
        patient_symptoms: [
          "Shortness of breath (during activity or at rest)",
          "Chest pain or discomfort",
          "Fatigue or tiredness after physical exertion",
          "Dizziness or lightheadedness",
          "Rapid or irregular heart rate"
        ]
      },
      {
        name: "Breathing Exercises for Cardiac Patients",
        description: "Enhances lung capacity and oxygenation.",
        video: "https://www.youtube.com/watch?v=JIXkf_i3kG0",
        sets: 3,
        reps: 10,
        symptoms: [
          "Shortness of breath (during activity or at rest)",
          "Chest pain or discomfort",
          "Fatigue or tiredness after physical exertion"
        ],
        patient_symptoms: [
          "Shortness of breath (during activity or at rest)",
          "Chest pain or discomfort",
          "Fatigue or tiredness after physical exertion",
          "Dizziness or lightheadedness",
          "Rapid or irregular heart rate"
        ]
      }
    ],
    "Neurological Rehabilitation": [
      {
        name: "Arm-Reaching Exercises",
        description: "Improves upper limb coordination and strength post-neurological events.",
        video: "https://www.youtube.com/watch?v=dqIWBBtYMuo",
        sets: 3,
        reps: 10,
        symptoms: [
          "Weakness or paralysis in limbs",
          "Difficulty with coordination and motor control",
          "Numbness or tingling in the limbs",
          "Muscle spasms or involuntary movements"
        ],
        patient_symptoms: [
          "Weakness or paralysis in limbs",
          "Difficulty with coordination and motor control",
          "Numbness or tingling in the limbs",
          "Muscle spasms or involuntary movements"
        ]
      },
      {
        name: "Gait Training",
        description: "Assists in relearning walking patterns and improving balance.",
        video: "https://www.youtube.com/watch?v=dqIWBBtYMuo",
        sets: 1,
        reps: 12,
        symptoms: [
          "Difficulty walking or maintaining balance",
          "Tremors or involuntary movements",
          "Fatigue or muscle stiffness"
        ],
        patient_symptoms: [
          "Weakness or paralysis in limbs",
          "Difficulty with coordination and motor control",
          "Numbness or tingling in the limbs",
          "Muscle spasms or involuntary movements"
        ]
      }
    ]
  };
  

const saveExerciseData = async () => {
  for (const category in exerciseData) {
    const exercises = exerciseData[category].map(exercise => ({
      name: exercise.name,
      description: exercise.description,
      video: exercise.video,
      sets: exercise.sets,
      reps: exercise.reps,
      symptoms: exercise.symptoms
    }));

    const newExerciseCategory = new Exercise({
      category,
      exercises
    });

    await newExerciseCategory.save();
  }
};

saveExerciseData().then(() => {
  console.log("Exercise data saved successfully.");
}).catch(err => {
  console.error("Error saving exercise data:", err);
});
