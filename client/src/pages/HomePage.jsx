import { Link } from "react-router-dom"
import { HandHeart, Activity, Calendar, Video } from "lucide-react"
import { motion } from "framer-motion"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.section
        className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <motion.div className="lg:w-1/2 space-y-6" variants={fadeIn}>
          <h1 className="text-4xl font-bold text-gray-900 lg:text-5xl">Your Journey to Recovery Starts Here</h1>
          <p className="text-xl text-gray-600">
            RehabEase provides personalized virtual rehabilitation programs, expert guidance, and progress tracking to
            help you recover faster and more effectively.
          </p>
          <div className="flex gap-4">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-2 px-4 rounded border border-blue-600 transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="lg:w-1/2 relative w-full h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-xl"
          variants={fadeIn}
        >
          <motion.img
            src="https://media.istockphoto.com/id/1501185786/photo/man-doing-physical-therapy-exercises-using-a-stretch-band.jpg?s=2048x2048&w=is&k=20&c=iL3sOsffH5maNRlK6Dwypjut_spvs3F1ZLO5ww8TSA0="
            alt="Man doing physical therapy exercises using a stretch band"
            className="object-cover w-full h-full"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </motion.div>
      </motion.section>

      <motion.section className="mb-16" initial="initial" animate="animate" variants={stagger}>
        <motion.h2 className="text-3xl font-bold text-center mb-8" variants={fadeIn}>
          How RehabEase Works
        </motion.h2>
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" variants={stagger}>
          {[
            {
              icon: HandHeart,
              title: "Personalized Care",
              description: "Tailored rehabilitation programs designed for your specific needs",
            },
            {
              icon: Activity,
              title: "Progress Tracking",
              description: "Monitor your recovery journey with detailed analytics and insights",
            },
            {
              icon: Calendar,
              title: "Flexible Scheduling",
              description: "Book appointments with therapists at times that suit you best",
            },
            {
              icon: Video,
              title: "Virtual Sessions",
              description: "High-quality video calls for remote consultations and guided exercises",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className="text-center mb-16" initial="initial" animate="animate" variants={stagger}>
        <motion.h2 className="text-3xl font-bold mb-4" variants={fadeIn}>
          Ready to Start Your Recovery Journey?
        </motion.h2>
        <motion.p className="text-xl text-gray-600 mb-8" variants={fadeIn}>
          Join thousands of patients who have successfully recovered with RehabEase
        </motion.p>
        <motion.div variants={fadeIn}>
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg inline-block transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up Now
          </Link>
        </motion.div>
      </motion.section>
    </div>
  )
}

export default HomePage

