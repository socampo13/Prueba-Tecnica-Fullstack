import mongoose from 'mongoose';


const NoteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        user:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Note = mongoose.model("Note", NoteSchema);