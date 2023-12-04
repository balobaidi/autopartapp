

import mongoose from 'mongoose'

const PartSchema = new mongoose.Schema({
    title: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    state: { type: String, enum: ['draft', 'published', 'closed'], default: 'draft' },
    questions: [
        {
            questionType: { type: String,
                            enum: ['multipleChoice', 'rating', 'shortAnswer'], required: true },
            questionText: { type: String, required: true },
            choices: {
                type: [
                    {
                        value: { type: String, required: true },
                        allowExtraInfo: { type: Boolean, default: false },
                    },
                ],
                required: function () { return this.questionType === 'multipleChoice'; },
            },
            
            ratingScale: { type: Number, required: function ()
                           { return this.questionType === 'rating'; } },
            answerMaxLength: { type: Number, required: function ()
                               { return this.questionType === 'shortAnswer'; } },
        }
    ],

    created: { type: Date, default: Date.now },
    updated: Date, 
    
    startDate: { type: Date, 
                 required: function () { return this.state === 'published'; } },
    endDate: { type: Date,
                required: function () { return this.state === 'published'; } },
});

export default mongoose.model('Part', PartSchema);

