export const fetchFirstSentence = async (): Promise<string|null> => {
  try {
    const firstSentence = await getFirstSentence();

    if (firstSentence) {
      const systemMessage = { role: 'assistant', content: firstSentence };
      setMessages((prevMessages) => [...prevMessages, systemMessage]);
      setIsLoading(false);
    }

  } catch (error) {
    console.error('Error fetching first sentence:', error);
  }

}