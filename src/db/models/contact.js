import { number } from 'joi';
import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String },
    phoneNumber: { type: number },
    email: { type: String },
    userId: { type: Schema.Types.ObjectId },
    photo: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      required: true,
      default: 'personal',
      enum: ['work', 'home', 'personal'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contact', contactSchema);
