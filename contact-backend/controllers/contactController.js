// const Contact = require('../models/Contact');
// const emailService = require('../config/emailService');

// // @desc    Create new contact submission
// // @route   POST /api/contact
// // @access  Public
// exports.createContact = async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     // Get IP address
//     const ipAddress = req.ip || req.connection.remoteAddress;

//     // Create contact in database
//     const contact = await Contact.create({
//       name,
//       email,
//       message,
//       ipAddress,
//     });

//     // Send emails asynchronously
//     const emailPromises = [];

//     // Send notification to admin
//     emailPromises.push(
//       emailService
//         .sendAdminNotification(contact)
//         .then(() => {
//           contact.emailSent.admin = true;
//           return contact.save();
//         })
//         .catch((error) => {
//           console.error('Failed to send admin notification:', error.message);
//         })
//     );

//     // Send confirmation to user
//     emailPromises.push(
//       emailService
//         .sendUserConfirmation(contact)
//         .then(() => {
//           contact.emailSent.user = true;
//           return contact.save();
//         })
//         .catch((error) => {
//           console.error('Failed to send user confirmation:', error.message);
//         })
//     );

//     // Wait for all emails to be sent
//     await Promise.all(emailPromises);

//     res.status(201).json({
//       success: true,
//       message: 'Thank you for your message! We will get back to you soon.',
//       data: {
//         id: contact._id,
//         name: contact.name,
//         email: contact.email,
//         createdAt: contact.createdAt,
//       },
//     });
//   } catch (error) {
//     console.error('Contact submission error:', error);

//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map((err) => err.message);
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors,
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: 'Failed to submit contact form. Please try again later.',
//     });
//   }
// };

// // @desc    Get all contacts (Admin only - you can add authentication later)
// // @route   GET /api/contact
// // @access  Private
// exports.getAllContacts = async (req, res) => {
//   try {
//     const { status, page = 1, limit = 10 } = req.query;

//     const query = {};
//     if (status) {
//       query.status = status;
//     }

//     const contacts = await Contact.find(query)
//       .sort({ createdAt: -1 })
//       .limit(limit * 1)
//       .skip((page - 1) * limit);

//     const count = await Contact.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       data: contacts,
//       totalPages: Math.ceil(count / limit),
//       currentPage: page,
//       total: count,
//     });
//   } catch (error) {
//     console.error('Get contacts error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve contacts',
//     });
//   }
// };

// // @desc    Get single contact by ID
// // @route   GET /api/contact/:id
// // @access  Private
// exports.getContactById = async (req, res) => {
//   try {
//     const contact = await Contact.findById(req.params.id);

//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: 'Contact not found',
//       });
//     }

//     // Mark as read
//     if (contact.status === 'new') {
//       contact.status = 'read';
//       await contact.save();
//     }

//     res.status(200).json({
//       success: true,
//       data: contact,
//     });
//   } catch (error) {
//     console.error('Get contact error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve contact',
//     });
//   }
// };

// // @desc    Update contact status
// // @route   PATCH /api/contact/:id
// // @access  Private
// exports.updateContactStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     if (!['new', 'read', 'replied'].includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid status value',
//       });
//     }

//     const contact = await Contact.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true, runValidators: true }
//     );

//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: 'Contact not found',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: contact,
//     });
//   } catch (error) {
//     console.error('Update contact error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update contact',
//     });
//   }
// };

// // @desc    Delete contact
// // @route   DELETE /api/contact/:id
// // @access  Private
// exports.deleteContact = async (req, res) => {
//   try {
//     const contact = await Contact.findByIdAndDelete(req.params.id);

//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: 'Contact not found',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Contact deleted successfully',
//     });
//   } catch (error) {
//     console.error('Delete contact error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete contact',
//     });
//   }
// };


const Contact = require('../models/Contact');
const emailService = require('../config/emailService');

// @desc    Create new contact submission
// @route   POST /api/contact
// @access  Public
exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Get IP address
    const ipAddress = req.ip || req.connection.remoteAddress;

    // Create contact in database
    const contact = await Contact.create({
      name,
      email,
      message,
      ipAddress,
    });

    // Send emails asynchronously (without saving multiple times)
    const emailResults = {
      admin: false,
      user: false
    };

    // Send both emails in parallel
    const [adminResult, userResult] = await Promise.allSettled([
      emailService.sendAdminNotification(contact),
      emailService.sendUserConfirmation(contact)
    ]);

    // Check results
    if (adminResult.status === 'fulfilled') {
      emailResults.admin = true;
    } else {
      console.error('Failed to send admin notification:', adminResult.reason?.message || adminResult.reason);
    }

    if (userResult.status === 'fulfilled') {
      emailResults.user = true;
    } else {
      console.error('Failed to send user confirmation:', userResult.reason?.message || userResult.reason);
    }

    // Update email status in one save operation
    contact.emailSent.admin = emailResults.admin;
    contact.emailSent.user = emailResults.user;
    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        createdAt: contact.createdAt,
        emailsSent: emailResults
      },
    });
  } catch (error) {
    console.error('Contact submission error:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.',
    });
  }
};

// // @desc    Get all contacts (Admin only - you can add authentication later)
// // @route   GET /api/contact
// // @access  Private
// exports.getAllContacts = async (req, res) => {
//   try {
//     const { status, page = 1, limit = 10 } = req.query;

//     const query = {};
//     if (status) {
//       query.status = status;
//     }

//     const contacts = await Contact.find(query)
//       .sort({ createdAt: -1 })
//       .limit(limit * 1)
//       .skip((page - 1) * limit);

//     const count = await Contact.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       data: contacts,
//       totalPages: Math.ceil(count / limit),
//       currentPage: page,
//       total: count,
//     });
//   } catch (error) {
//     console.error('Get contacts error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve contacts',
//     });
//   }
// };

// // @desc    Get single contact by ID
// // @route   GET /api/contact/:id
// // @access  Private
// exports.getContactById = async (req, res) => {
//   try {
//     const contact = await Contact.findById(req.params.id);

//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: 'Contact not found',
//       });
//     }

//     // Mark as read
//     if (contact.status === 'new') {
//       contact.status = 'read';
//       await contact.save();
//     }

//     res.status(200).json({
//       success: true,
//       data: contact,
//     });
//   } catch (error) {
//     console.error('Get contact error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve contact',
//     });
//   }
// };

// // @desc    Update contact status
// // @route   PATCH /api/contact/:id
// // @access  Private
// exports.updateContactStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     if (!['new', 'read', 'replied'].includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid status value',
//       });
//     }

//     const contact = await Contact.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true, runValidators: true }
//     );

//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: 'Contact not found',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: contact,
//     });
//   } catch (error) {
//     console.error('Update contact error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update contact',
//     });
//   }
// };

// // @desc    Delete contact
// // @route   DELETE /api/contact/:id
// // @access  Private
// exports.deleteContact = async (req, res) => {
//   try {
//     const contact = await Contact.findByIdAndDelete(req.params.id);

//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: 'Contact not found',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Contact deleted successfully',
//     });
//   } catch (error) {
//     console.error('Delete contact error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete contact',
//     });
//   }
// };