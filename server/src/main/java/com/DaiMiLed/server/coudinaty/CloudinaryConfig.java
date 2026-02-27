package com.DaiMiLed.server.coudinaty;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for Cloudinary integration.
 * Sets up the Cloudinary bean using properties from application configuration.
 * Used for handling image uploads (e.g., user profiles).
 * 
 * @author Nefara Team
 * @version 1.0
 * @since 2026-01-27
 */
@Configuration
public class CloudinaryConfig {

    @Value("${cloudinary.cloud_name}")
    private String cloudName;

    @Value("${cloudinary.api_key}")
    private String apiKey;

    @Value("${cloudinary.api_secret}")
    private String apiSecret;

    /**
     * Creates and configures the Cloudinary client bean.
     * 
     * @return configured {@link Cloudinary} instance
     */
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret));
    }
}
