const generateAIMeme = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt for your meme");
      return;
    }
    if (!serverConnected) {
      setError("Backend not connected. Start the server and try again.");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const resp = await fetch("http://localhost:3001/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.message || data.error || "Server error");
      }

      if (!data.success || !data.image) {
        throw new Error("Failed to generate image");
      }

      // Pass generated image back to parent
      onMemeGenerated(data.image, prompt, "");
      setPrompt("");
      
    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.message || "Failed to generate meme. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };