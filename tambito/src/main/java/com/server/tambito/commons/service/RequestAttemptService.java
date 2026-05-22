package com.server.tambito.commons.service;

import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.stereotype.Service;

@Service
public class RequestAttemptService {

    private final ConcurrentHashMap<String, AttemptWindow> attempts = new ConcurrentHashMap<>();

    public boolean isBlocked(String key, int maxAttempts, long windowSeconds) {
        AttemptWindow window = attempts.computeIfAbsent(key, k -> new AttemptWindow());
        long now = Instant.now().getEpochSecond();

        synchronized (window) {
            if (now - window.windowStart >= windowSeconds) {
                window.windowStart = now;
                window.count.set(0);
            }
            return window.count.get() >= maxAttempts;
        }
    }

    public void registerAttempt(String key, int maxAttempts, long windowSeconds) {
        AttemptWindow window = attempts.computeIfAbsent(key, k -> new AttemptWindow());
        long now = Instant.now().getEpochSecond();

        synchronized (window) {
            if (now - window.windowStart >= windowSeconds) {
                window.windowStart = now;
                window.count.set(0);
            }
            window.count.incrementAndGet();
        }
    }

    public void clearAttempts(String key) {
        attempts.remove(key);
    }

    private static class AttemptWindow {
        private long windowStart = Instant.now().getEpochSecond();
        private final AtomicInteger count = new AtomicInteger(0);
    }
}
