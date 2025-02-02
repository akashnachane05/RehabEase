 const exerciseData = {
    "Shoulder Rehabilitation": [
      {
        name: "Pendulum Swings",
        description: "Gentle exercise to increase shoulder mobility post-injury or surgery.",
        video: "https://www.youtube.com/watch?v=S4H_rZA2kSM",
        sets: 3,
        reps: 10,
        symptoms: [
          'Shoulder pain',
          "Pain (location, intensity, duration)",
          "Range of motion (restriction, tightness)",
          "Swelling",
          "Weakness in the shoulder or arm",
          "Stiffness",
          "Discomfort while lifting or reaching overhead",
          "Instability or a feeling of weakness in the shoulder joint",
          "Numbness or tingling in the shoulder or arm"
        ]
      },
      {
        name: "Shoulder External Rotation with Resistance Band",
        description: "Strengthens the rotator cuff muscles to improve shoulder stability.",
        video: "https://www.youtube.com/watch?v=YMytSEYr2yU",
        sets: 3,
        reps: 15,
        symptoms: [
          "Pain (location, intensity, duration)",
          "Weakness in the shoulder or arm",
          "Range of motion (restriction, tightness)",
          "Stiffness",
          "Discomfort while lifting or reaching overhead",
          "Instability or a feeling of weakness in the shoulder joint"
        ]
      },
      {
        name: "Wall Slides",
        description: "Enhances shoulder flexibility and range of motion.",
        video: "https://www.youtube.com/watch?v=QVyMMFR6hec",
        sets: 3,
        reps: 12,
        symptoms: [
          "Pain (location, intensity, duration)",
          "Range of motion (restriction, tightness)",
          "Swelling",
          "Weakness in the shoulder or arm",
          "Stiffness",
          "Instability or a feeling of weakness in the shoulder joint"
        ]
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
          "Pain (location, intensity, duration)",
          "Swelling",
          "Limited knee flexion (difficulty bending the knee)",
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
          "Pain (location, intensity, duration)",
          "Swelling",
          "Weakness in the quadriceps",
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
          "Pain (location, intensity, duration)",
          "Limited knee flexion (difficulty bending the knee)",
          "Swelling",
          "Weakness in the quadriceps or hamstrings",
          "Stiffness or tightness in the knee"
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
          "Pain (location, intensity, duration)",
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
          "Pain (location, intensity, duration)",
          "Limited range of motion (difficulty moving the hip outward or inward)",
          "Weakness in the hip or thigh muscles",
          "Stiffness or tightness in the hip joint",
          "Instability or a feeling of hip dislocation"
        ]
      },
      {
        name: "Hip Flexor Stretches",
        description: "Enhances flexibility of the hip flexor muscles.",
        video: "https://www.youtube.com/watch?v=cLQcXGYKigg",
        sets: 3,
        reps: 10,
        symptoms: [
          "Pain (location, intensity, duration)",
          "Stiffness or tightness in the hip joint",
          "Weakness in the hip or thigh muscles",
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
          "Pain (location, intensity, duration)",
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
          "Pain (location, intensity, duration)",
          "Weakness or instability when standing or walking",
          "Difficulty moving toes or foot (lack of mobility)"
        ]
      },
      {
        name: "Standing Heel Raises",
        description: "Strengthens the calf muscles and improves ankle stability.",
        video: "https://www.youtube.com/watch?v=PLVFCd_4qJSQK3f_mbroW8EjKWXeNpL6JU",
        sets: 3,
        reps: 15,
        symptoms: [
          "Pain (location, intensity, duration)",
          "Swelling or edema around the ankle or foot",
          "Weakness or instability when standing or walking",
          "Difficulty balancing on one foot"
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
          "Back pain (location, intensity, duration)",
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
          "Back pain (location, intensity, duration)",
          "Weakness in the core or lower back muscles",
          "Stiffness or tightness in the spine or abdomen",
          "Difficulty maintaining posture while standing or sitting"
        ]
      },
      {
        name: "Seated Back Extensions",
        description: "Strengthens the lower back muscles.",
        video: "https://www.youtube.com/watch?v=dqIWBBtYMuo",
        sets: 3,
        reps: 12,
        symptoms: [
          "Back pain (location, intensity, duration)",
          "Weakness in the core or lower back muscles",
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
        reps: "10-15 minutes",
        symptoms: [
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
        ]
      },
      {
        name: "Gait Training",
        description: "Assists in relearning walking patterns and improving balance.",
        video: "https://www.youtube.com/watch?v=dqIWBBtYMuo",
        sets: 1,
        reps: "10-15 minutes",
        symptoms: [
          "Difficulty walking or maintaining balance",
          "Tremors or involuntary movements",
          "Fatigue or muscle stiffness"
        ]
      }
    ]
  };
module.exports=exerciseData;