function streamHtmlDocument(stream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return stream.pipeThrough(new TransformStream({
    start(controller) {
      controller.enqueue(encoder.encode("<!DOCTYPE html>"));
    }
  }));
}

export { streamHtmlDocument };