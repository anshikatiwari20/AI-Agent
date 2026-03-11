/**
 * Mock AI Therapist - No external API required
 * Provides intelligent-sounding responses based on pattern matching
 */

interface TherapyResponse {
  response: string;
  technique: string;
  theme: string;
}

const GREETING_PATTERNS = /\b(hi|hello|hey|hii|hiya|greetings)\b/i;
const ANXIETY_PATTERNS = /\b(anxious|anxiety|worried|worry|panic|nervous|stress|stressed)\b/i;
const SAD_PATTERNS = /\b(sad|depressed|depression|down|low|unhappy|crying|cry)\b/i;
const ANGER_PATTERNS = /\b(angry|anger|mad|frustrated|irritated|annoyed)\b/i;
const SLEEP_PATTERNS = /\b(sleep|insomnia|tired|exhausted|fatigue|can't sleep)\b/i;
const RELATIONSHIP_PATTERNS = /\b(relationship|partner|friend|family|conflict|argument)\b/i;
const WORK_PATTERNS = /\b(work|job|career|boss|colleague|burnout)\b/i;
const POSITIVE_PATTERNS = /\b(good|great|better|happy|excited|wonderful|amazing)\b/i;
const QUESTION_PATTERNS = /\b(how|what|why|when|where|can you|could you|should i)\b/i;

const RESPONSES = {
  greeting: [
    "Hello! I'm SamatvaSetu, your AI companion. I'm here to listen and support you. How are you feeling today?",
    "Hi there! It's wonderful to connect with you. What's on your mind right now?",
    "Welcome! I'm here to provide a safe space for you. What would you like to talk about?",
    "Hello! Thank you for reaching out. How can I support you today?",
  ],
  anxiety: [
    "I hear that you're feeling anxious. That must be challenging. Can you tell me more about what's triggering these feelings? Sometimes naming our worries can help us understand them better.",
    "Anxiety can feel overwhelming. Remember, it's your mind trying to protect you. Let's explore what's beneath these feelings. What specific situations make you feel most anxious?",
    "Thank you for sharing that you're feeling worried. It takes courage to acknowledge these feelings. Have you noticed any patterns in when your anxiety appears?",
    "I understand anxiety can be exhausting. One helpful approach is grounding yourself in the present moment. What are three things you can see around you right now?",
  ],
  sadness: [
    "I'm sorry you're feeling down. Your feelings are valid, and it's okay to not be okay sometimes. Would you like to talk about what's contributing to these feelings?",
    "Sadness is a natural human emotion, even though it's difficult to experience. What's been weighing on your heart lately?",
    "Thank you for trusting me with how you're feeling. Depression can make everything feel heavy. What small thing brought you even a moment of comfort recently?",
    "I hear your pain. Remember that feelings, even difficult ones, are temporary. What's one gentle thing you could do for yourself today?",
  ],
  anger: [
    "It sounds like you're feeling frustrated. Anger often signals that a boundary has been crossed or a need isn't being met. What situation is triggering these feelings?",
    "I hear your frustration. Anger is a valid emotion - it's telling us something important. What do you think is really bothering you underneath the anger?",
    "Thank you for sharing these feelings. When we're angry, it's often because something matters deeply to us. What value or need feels threatened right now?",
  ],
  sleep: [
    "Sleep difficulties can affect everything in our lives. What's your current bedtime routine like? Sometimes small adjustments can make a big difference.",
    "I understand how exhausting sleep problems can be. Have you noticed any patterns - like specific thoughts or worries that keep you awake?",
    "Quality sleep is so important for mental health. What typically happens when you try to sleep? Let's explore some strategies that might help.",
  ],
  relationship: [
    "Relationships can be complex and challenging. What specific aspect of this relationship is troubling you most right now?",
    "Thank you for sharing about your relationship concerns. Good communication is often key. Have you been able to express how you're feeling to the other person?",
    "Interpersonal conflicts can be really stressful. What would an ideal resolution look like for you in this situation?",
  ],
  work: [
    "Work-related stress is very common. What aspects of your job are feeling most overwhelming right now?",
    "Burnout is real and serious. It sounds like your work is taking a toll. What boundaries might you need to set to protect your wellbeing?",
    "Career concerns can affect our whole sense of self. What would make your work situation feel more manageable?",
  ],
  positive: [
    "I'm so glad to hear you're feeling good! What's contributing to this positive feeling? Recognizing our wins, even small ones, is important.",
    "That's wonderful! It's great that you're taking a moment to acknowledge positive feelings. What's been going well for you?",
    "I love hearing this! Celebrating the good moments is just as important as processing difficult ones. Tell me more about what's making you happy.",
  ],
  question: [
    "That's a thoughtful question. Rather than giving you a direct answer, let's explore this together. What possibilities have you been considering?",
    "I appreciate you asking. What does your intuition tell you about this? Sometimes we know more than we think we do.",
    "Good question. Let's think through this together. What factors are most important to you in this situation?",
  ],
  general: [
    "I'm here to listen. Can you tell me more about what's on your mind?",
    "Thank you for sharing that with me. How are these thoughts and feelings affecting your daily life?",
    "I hear you. What do you think would be most helpful to explore right now?",
    "That sounds important. Help me understand more - what's been going through your mind about this?",
    "I appreciate you opening up. What would you most like to change about this situation?",
  ],
  followUp: [
    "How does that make you feel when you think about it?",
    "What thoughts come up for you around this?",
    "Can you say more about that?",
    "What's the hardest part about this for you?",
    "What would support look like for you right now?",
  ],
};

let conversationCount = 0;

export function getMockTherapistResponse(message: string): TherapyResponse {
  const lowerMessage = message.toLowerCase();
  conversationCount++;

  // Determine response category
  let category: keyof typeof RESPONSES = "general";
  let technique = "supportive";
  let theme = "general_support";

  if (GREETING_PATTERNS.test(lowerMessage)) {
    category = "greeting";
    technique = "engagement";
    theme = "introduction";
  } else if (ANXIETY_PATTERNS.test(lowerMessage)) {
    category = "anxiety";
    technique = "cognitive_behavioral";
    theme = "anxiety_management";
  } else if (SAD_PATTERNS.test(lowerMessage)) {
    category = "sadness";
    technique = "validation";
    theme = "mood_support";
  } else if (ANGER_PATTERNS.test(lowerMessage)) {
    category = "anger";
    technique = "emotion_exploration";
    theme = "anger_management";
  } else if (SLEEP_PATTERNS.test(lowerMessage)) {
    category = "sleep";
    technique = "behavioral_intervention";
    theme = "sleep_hygiene";
  } else if (RELATIONSHIP_PATTERNS.test(lowerMessage)) {
    category = "relationship";
    technique = "interpersonal_therapy";
    theme = "relationships";
  } else if (WORK_PATTERNS.test(lowerMessage)) {
    category = "work";
    technique = "stress_management";
    theme = "work_life_balance";
  } else if (POSITIVE_PATTERNS.test(lowerMessage)) {
    category = "positive";
    technique = "positive_psychology";
    theme = "wellbeing";
  } else if (QUESTION_PATTERNS.test(lowerMessage)) {
    category = "question";
    technique = "socratic_method";
    theme = "problem_solving";
  }

  // Add follow-up questions after a few exchanges
  const responses = RESPONSES[category];
  const randomIndex = Math.floor(Math.random() * responses.length);
  let response = responses[randomIndex];

  // Occasionally add a follow-up question
  if (conversationCount > 2 && Math.random() > 0.5) {
    const followUpIndex = Math.floor(Math.random() * RESPONSES.followUp.length);
    response += " " + RESPONSES.followUp[followUpIndex];
  }

  return {
    response,
    technique,
    theme,
  };
}
