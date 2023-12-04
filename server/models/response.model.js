

import mongoose from 'mongoose'

const ResponseSchema = new mongoose.Schema({
  part: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
  respondent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  answers: [
    {
      question: { type: mongoose.Schema.Types.ObjectId, ref: 'Part.questions', required: true },
      answer: { type: String, required: true },
    }
  ],
});

export default  mongoose.model('Response', ResponseSchema);


