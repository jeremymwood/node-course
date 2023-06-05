const mongoose = require('mongoose');
const {mongo} = require("mongoose");


mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular.js Course',
        author: 'Jeremy',
        tags: ['angular', 'frontend'],
        isPublished: true
    })

    const result = await course.save();
    console.log(result);
}

// createCourse();

async function getCourses() {
    const courses = await Course
        .find({ author: 'Jeremy', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

getCourses();
