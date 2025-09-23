import Diet from '../Models/dietModel.js';


export const getAllDiet = async (req, res) => {
  try {
    console.log('📋 Fetching all diets...');
    const diets = await Diet.find().populate('users', 'name email');
    console.log(`✅ Found ${diets.length} diets`);
    res.status(200).json(diets);
  } catch (error) {
    console.error('❌ Error fetching diets:', error);
    res.status(500).json({ message: error.message });
  }
};

export const createDiet = async (req, res) => {
  try {
    console.log('📝 Creating new diet:', req.body);
    const { title, description, userIds } = req.body;
    
    // Validate required fields
    if (!title || !description || !userIds || userIds.length === 0) {
      return res.status(400).json({ 
        message: 'Title, description, and at least one user are required' 
      });
    }

    const diet = new Diet({ 
      title, 
      description, 
      users: userIds // Map userIds to users field
    });
    
    await diet.save();
    console.log('✅ Diet created successfully');
    
    // Populate users data before sending response
    const populatedDiet = await Diet.findById(diet._id).populate('users', 'name email');
    
    res.status(201).json(populatedDiet);
  } catch (error) {
    console.error('❌ Error creating diet:', error);
    res.status(400).json({ message: error.message });
  }
};

export const getDietById = async (req, res) => {
  try {
    const diet = await Diet.findById(req.params.id).populate('users', 'name email');
    if (!diet) {
      return res.status(404).json({ message: 'Diet not found' });
    }
    res.status(200).json(diet);
  } catch (error) {
    console.error('❌ Error fetching diet:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateDiet = async (req, res) => {
  try {
    const { title, description, userIds } = req.body;
    const diet = await Diet.findByIdAndUpdate(
      req.params.id,
      { title, description, users: userIds },
      { new: true }
    ).populate('users', 'name email');
    
    if (!diet) {
      return res.status(404).json({ message: 'Diet not found' });
    }
    
    res.status(200).json(diet);
  } catch (error) {
    console.error('❌ Error updating diet:', error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteDiet = async (req, res) => {
  try {
    const diet = await Diet.findByIdAndDelete(req.params.id);
    if (!diet) {
      return res.status(404).json({ message: 'Diet not found' });
    }
    res.status(200).json({ message: 'Diet deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting diet:', error);
    res.status(500).json({ message: error.message });
  }
};