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
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({ author: 'Jeremy', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({name: 1})
        .select({name: 1, tags: 1});
        // .count()
    console.log(courses);

}
// getCourses();

async function updateCourse(id) {
    const result = await Course.updateOne({ _id: id }, {
        $set: {
            author: 'Jeremy Wood',
            isPublished: false
        }
    });
    console.log(result);
}
// updateCourse('647e525eec634ae63c750cb7');

async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id});
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}
removeCourse('647e525eec634ae63c750cb7');