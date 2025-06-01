/**
 * WebGL Fluid Simulation - Splash Cursor Effect
 * Based on ReactBits.dev's splash cursor effect
 * Adapted from https://github.com/PavelDoGreat/WebGL-Fluid-Simulation
 */

// Pointer class to track mouse movement
class Pointer {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.down = false;
        this.moved = false;
        this.color = [0, 0, 0];
    }
}

class FluidSplashCursor {
    constructor() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1'; // Behind page content
        this.canvas.style.pointerEvents = 'none'; // Don't block mouse events
        document.body.appendChild(this.canvas);

        // Configuration options
        this.config = {
            TEXTURE_DOWNSAMPLE: 1,
            DENSITY_DISSIPATION: 0.94,  // Faster dissipation for more dynamic movement
            VELOCITY_DISSIPATION: 0.95, // Faster dissipation for more dynamic movement
            PRESSURE_ITERATIONS: 22,    // Higher quality simulation
            SPLAT_RADIUS: 0.012,       // Larger splats for more visibility
            SPLAT_FORCE: 12000,        // Stronger force for more impact
            COLORFUL: true,
            SHADING: true,
            BLOOM: true,               // Add bloom effect
            BLOOM_INTENSITY: 0.8,      // Bloom intensity
            BLOOM_THRESHOLD: 0.6,      // Bloom threshold
            AUTO_SPLAT: true,          // Enable auto splats
            AUTO_SPLAT_INTERVAL: 4000, // Interval between auto splats in ms
            PAUSED: false
        };

        // Enhanced color palette for splats - more vibrant and diverse colors
        this.COLORS = [
            { r: 0.4, g: 0.7, b: 1.0 },   // bright blue
            { r: 0.9, g: 0.3, b: 0.7 },   // vivid pink
            { r: 0.2, g: 0.9, b: 0.5 },   // neon green
            { r: 1.0, g: 0.8, b: 0.2 },   // golden yellow
            { r: 0.7, g: 0.4, b: 1.0 },   // deep violet
            { r: 1.0, g: 0.3, b: 0.3 },   // crimson red
            { r: 0.1, g: 0.7, b: 1.0 },   // azure blue
            { r: 1.0, g: 0.4, b: 0.8 },   // hot pink
            { r: 0.3, g: 0.8, b: 0.8 },   // turquoise
            { r: 0.9, g: 0.5, b: 0.1 },   // orange
            { r: 0.5, g: 1.0, b: 0.1 },   // lime green
            { r: 0.4, g: 0.3, b: 0.9 }    // indigo
        ];

        // Initialize timestamps for frame delta calculation
        this.lastUpdateTime = Date.now();
        
        // Initialize pointers for tracking mouse movement
        this.pointers = [];
        this.pointers.push(new Pointer());
        
        // Initialize WebGL context
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        if (!this.gl) {
            console.error('WebGL not supported');
            return;
        }

        // Set canvas dimensions
        this.resizeCanvas();
        
        // Initialize WebGL resources
        this.initShaders();
        this.initFramebuffers();
        this.setupQuadBuffer();
        this.setupEventListeners();
        this.startAnimation();
        
        // Set up auto splats if enabled
        if (this.config.AUTO_SPLAT) {
            this.setupAutoSplats();
        }
        
        // Create an initial splat to make it visible immediately
        setTimeout(() => {
            // Create multiple initial splats for a more impressive start
            this.createMultiSplat(this.canvas.width / 2, this.canvas.height / 2, 4);
        }, 100);
    }

    // Resize canvas to match window size with device pixel ratio
    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    // Set up event listeners for mouse interactions
    setupEventListeners() {
        // Track mouse movement on document
        document.addEventListener('mousemove', e => {
            const pointer = this.pointers[0];
            const posX = e.clientX * (window.devicePixelRatio || 1);
            const posY = e.clientY * (window.devicePixelRatio || 1);
            
            // Calculate movement delta
            pointer.dx = posX - pointer.x;
            pointer.dy = posY - pointer.y;
            pointer.x = posX;
            pointer.y = posY;
            
            // Always mark as moved and assign a new random color with each movement
            pointer.moved = true;
            pointer.color = this.generateColor();
        });

        // Track mouse down/up on document
        document.addEventListener('mousedown', e => {
            const pointer = this.pointers[0];
            pointer.down = true;
            pointer.color = this.generateColor();
        });

        document.addEventListener('mouseup', () => {
            const pointer = this.pointers[0];
            pointer.down = false;
        });

        // Handle touch events
        document.addEventListener('touchmove', e => {
            e.preventDefault();
            const touch = e.touches[0];
            const posX = touch.clientX * (window.devicePixelRatio || 1);
            const posY = touch.clientY * (window.devicePixelRatio || 1);
            
            const pointer = this.pointers[0];
            pointer.moved = pointer.down;
            pointer.dx = posX - pointer.x;
            pointer.dy = posY - pointer.y;
            pointer.x = posX;
            pointer.y = posY;
        });

        document.addEventListener('touchstart', e => {
            e.preventDefault();
            const touch = e.touches[0];
            const posX = touch.clientX * (window.devicePixelRatio || 1);
            const posY = touch.clientY * (window.devicePixelRatio || 1);
            
            const pointer = this.pointers[0];
            pointer.down = true;
            pointer.x = posX;
            pointer.y = posY;
            pointer.color = this.generateColor();
        });

        document.addEventListener('touchend', () => {
            const pointer = this.pointers[0];
            pointer.down = false;
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }

    // Generate enhanced random color from palette or fully random with glow effect
    generateColor() {
        // Determine color source - prefer palette colors 70% of time for consistency
        if (Math.random() > 0.3) {
            // Get a color from our enhanced palette
            const color = this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
            
            // Occasionally add slight variation to palette colors for more diversity
            if (Math.random() > 0.7) {
                return [
                    Math.min(1.0, color.r + (Math.random() * 0.2 - 0.1)),
                    Math.min(1.0, color.g + (Math.random() * 0.2 - 0.1)),
                    Math.min(1.0, color.b + (Math.random() * 0.2 - 0.1))
                ];
            }
            
            return [color.r, color.g, color.b];
        } else {
            // Generate fully random vibrant colors with better distribution
            // Use HSL-inspired generation for more visually pleasing random colors
            const hue = Math.random();
            const saturation = 0.7 + Math.random() * 0.3; // High saturation (0.7-1.0)
            const lightness = 0.5 + Math.random() * 0.3;  // Medium-high lightness (0.5-0.8)
            
            // Convert HSL-inspired values to RGB-ish (not actual HSL→RGB conversion)
            // This is a simplified approach that still gives good color distribution
            return [
                Math.min(1.0, (1 + Math.sin(hue * Math.PI * 2)) * 0.5 * saturation * lightness * 1.5),
                Math.min(1.0, (1 + Math.sin((hue + 1/3) * Math.PI * 2)) * 0.5 * saturation * lightness * 1.5),
                Math.min(1.0, (1 + Math.sin((hue + 2/3) * Math.PI * 2)) * 0.5 * saturation * lightness * 1.5)
            ];
        }
    }

    // Compile shader from source
    compileShader(type, source) {
        const gl = this.gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    // Create program from shaders
    createProgram(vertexShader, fragmentShader) {
        const gl = this.gl;
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error: ' + gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    }

    // Initialize all shader programs
    initShaders() {
        const gl = this.gl;
        
        // Vertex shader used for all programs
        const vertexShaderSource = `
            precision highp float;
            attribute vec2 aPosition;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform vec2 texelSize;
            void main () {
                vUv = aPosition * 0.5 + 0.5;
                vL = vUv - vec2(texelSize.x, 0.0);
                vR = vUv + vec2(texelSize.x, 0.0);
                vT = vUv + vec2(0.0, texelSize.y);
                vB = vUv - vec2(0.0, texelSize.y);
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `;
        
        // Fragment shader for splatting
        const splatShaderSource = `
            precision highp float;
            uniform sampler2D uTarget;
            uniform float aspectRatio;
            uniform vec3 color;
            uniform vec2 point;
            uniform float radius;
            varying vec2 vUv;
            void main () {
                vec2 p = vUv - point.xy;
                p.x *= aspectRatio;
                vec3 splat = exp(-dot(p, p) / radius) * color;
                vec3 base = texture2D(uTarget, vUv).xyz;
                gl_FragColor = vec4(base + splat, 1.0);
            }
        `;
        
        // Fragment shader for advection
        const advectionShaderSource = `
            precision highp float;
            uniform sampler2D uVelocity;
            uniform sampler2D uSource;
            uniform vec2 texelSize;
            uniform float dt;
            uniform float dissipation;
            varying vec2 vUv;
            void main () {
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                gl_FragColor = vec4(dissipation * texture2D(uSource, coord).xyz, 1.0);
            }
        `;
        
        // Fragment shader for display with bloom effect
        const displayShaderSource = `
            precision highp float;
            uniform sampler2D uTexture;
            uniform float bloomIntensity;
            uniform float bloomThreshold;
            uniform bool enableBloom;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            
            // Apply a simple bloom effect
            vec3 applyBloom(vec3 color, float threshold, float intensity) {
                // Calculate brightness
                float brightness = dot(color, vec3(0.2126, 0.7152, 0.0722));
                
                // Apply threshold
                float factor = max(0.0, brightness - threshold) / max(brightness, 0.00001);
                
                // Sample adjacent pixels for the bloom effect
                vec3 bloom = color * factor * intensity;
                
                // Add samples from surrounding pixels
                bloom += texture2D(uTexture, vL).rgb * factor * intensity * 0.5;
                bloom += texture2D(uTexture, vR).rgb * factor * intensity * 0.5;
                bloom += texture2D(uTexture, vT).rgb * factor * intensity * 0.5;
                bloom += texture2D(uTexture, vB).rgb * factor * intensity * 0.5;
                
                // Add bloom to original color
                return color + bloom;
            }
            
            void main () {
                vec3 color = texture2D(uTexture, vUv).rgb;
                
                // Apply bloom effect if enabled
                if (enableBloom) {
                    color = applyBloom(color, bloomThreshold, bloomIntensity);
                }
                
                // Output final color
                gl_FragColor = vec4(color, 1.0);
            }
        `;
        
        // Compile vertex shader (shared)
        const vertexShader = this.compileShader(gl.VERTEX_SHADER, vertexShaderSource);
        
        // Compile fragment shaders
        const displayFragmentShader = this.compileShader(gl.FRAGMENT_SHADER, displayShaderSource);
        const splatFragmentShader = this.compileShader(gl.FRAGMENT_SHADER, splatShaderSource);
        const advectionFragmentShader = this.compileShader(gl.FRAGMENT_SHADER, advectionShaderSource);
        
        // Create shader programs
        this.displayProgram = this.createProgram(vertexShader, displayFragmentShader);
        this.splatProgram = this.createProgram(vertexShader, splatFragmentShader);
        this.advectionProgram = this.createProgram(vertexShader, advectionFragmentShader);
    }

    // Create and initialize framebuffers
    initFramebuffers() {
        const gl = this.gl;
        
        // Calculate simulation resolution based on downsample factor
        const simRes = this.getResolution(this.config.TEXTURE_DOWNSAMPLE);
        const dyeRes = this.getResolution(1); // Full resolution for dye/density
        
        this.textureWidth = dyeRes.width;
        this.textureHeight = dyeRes.height;
        this.texelWidth = 1.0 / this.textureWidth;
        this.texelHeight = 1.0 / this.textureHeight;
        
        // Create double framebuffers for ping-pong rendering
        this.densityTexture = this.createDoubleFBO(dyeRes.width, dyeRes.height, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR);
        this.velocityTexture = this.createDoubleFBO(simRes.width, simRes.height, gl.RGBA, gl.RGBA, gl.FLOAT, gl.LINEAR);
    }
    
    // Get resolution based on screen dimensions
    getResolution(scale) {
        const gl = this.gl;
        let width = gl.drawingBufferWidth >> scale;
        let height = gl.drawingBufferHeight >> scale;
        return { width, height };
    }

    // Create frame buffer object with texture
    createFBO(width, height, internalFormat, format, type, filter) {
        const gl = this.gl;
        
        // Create and bind framebuffer
        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        
        // Create and bind texture
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, null);
        
        // Attach texture to framebuffer
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        
        // Unbind
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        
        return {
            fbo,
            texture,
            width,
            height,
            attach(id) {
                gl.activeTexture(gl.TEXTURE0 + id);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                return id;
            }
        };
    }

    // Create double framebuffer for ping-pong rendering
    createDoubleFBO(width, height, internalFormat, format, type, filter) {
        let fbo1 = this.createFBO(width, height, internalFormat, format, type, filter);
        let fbo2 = this.createFBO(width, height, internalFormat, format, type, filter);
        
        return {
            read: fbo1,
            write: fbo2,
            swap() {
                let temp = this.read;
                this.read = this.write;
                this.write = temp;
            }
        };
    }

    // Set up quad buffer for drawing a full-screen quad
    setupQuadBuffer() {
        const gl = this.gl;
        
        // Create quad vertices
        const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        
        // Create vertex buffer
        this.quadBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        
        // Set up attribute pointers for all programs
        const setupProgram = (program) => {
            gl.useProgram(program);
            const positionAttribute = gl.getAttribLocation(program, 'aPosition');
            gl.enableVertexAttribArray(positionAttribute);
            gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
        };
        
        setupProgram(this.displayProgram);
        setupProgram(this.splatProgram);
        setupProgram(this.advectionProgram);
    }

    // Create a splat at the given position with velocity and color
    splat(x, y, dx, dy, color) {
        const gl = this.gl;
        
        // Splat on velocity field
        gl.viewport(0, 0, this.velocityTexture.read.width, this.velocityTexture.read.height);
        gl.useProgram(this.splatProgram);
        gl.uniform1f(gl.getUniformLocation(this.splatProgram, 'aspectRatio'), this.canvas.width / this.canvas.height);
        gl.uniform2f(gl.getUniformLocation(this.splatProgram, 'point'), x / this.canvas.width, 1.0 - y / this.canvas.height);
        gl.uniform3f(gl.getUniformLocation(this.splatProgram, 'color'), dx, -dy, 0.0);
        gl.uniform1f(gl.getUniformLocation(this.splatProgram, 'radius'), this.config.SPLAT_RADIUS / 100.0);
        gl.uniform1i(gl.getUniformLocation(this.splatProgram, 'uTarget'), this.velocityTexture.read.attach(0));
        this.bindFBO(this.velocityTexture.write.fbo);
        this.drawQuad();
        this.velocityTexture.swap();
        
        // Splat on density/dye field
        gl.viewport(0, 0, this.densityTexture.read.width, this.densityTexture.read.height);
        gl.useProgram(this.splatProgram);
        gl.uniform1f(gl.getUniformLocation(this.splatProgram, 'aspectRatio'), this.canvas.width / this.canvas.height);
        gl.uniform2f(gl.getUniformLocation(this.splatProgram, 'point'), x / this.canvas.width, 1.0 - y / this.canvas.height);
        gl.uniform3f(gl.getUniformLocation(this.splatProgram, 'color'), color[0] * 0.3, color[1] * 0.3, color[2] * 0.3);
        gl.uniform1f(gl.getUniformLocation(this.splatProgram, 'radius'), this.config.SPLAT_RADIUS);
        gl.uniform1i(gl.getUniformLocation(this.splatProgram, 'uTarget'), this.densityTexture.read.attach(0));
        this.bindFBO(this.densityTexture.write.fbo);
        this.drawQuad();
        this.densityTexture.swap();
    }

    // Advect velocity and density fields
    advect(target, velocity, source, dissipation, dt) {
        const gl = this.gl;
        
        gl.viewport(0, 0, target.read.width, target.read.height);
        gl.useProgram(this.advectionProgram);
        gl.uniform2f(gl.getUniformLocation(this.advectionProgram, 'texelSize'), 1.0 / target.read.width, 1.0 / target.read.height);
        gl.uniform1i(gl.getUniformLocation(this.advectionProgram, 'uVelocity'), velocity.read.attach(0));
        gl.uniform1i(gl.getUniformLocation(this.advectionProgram, 'uSource'), source.read.attach(1));
        gl.uniform1f(gl.getUniformLocation(this.advectionProgram, 'dt'), dt);
        gl.uniform1f(gl.getUniformLocation(this.advectionProgram, 'dissipation'), dissipation);
        
        this.bindFBO(target.write.fbo);
        this.drawQuad();
        target.swap();
    }

    // Helper to bind framebuffer
    bindFBO(fbo) {
        const gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    }

    // Draw a quad covering the viewport
    drawQuad() {
        const gl = this.gl;
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    // Set up auto splats at random intervals
    setupAutoSplats() {
        // Clear any existing interval
        if (this.autoSplatInterval) {
            clearInterval(this.autoSplatInterval);
        }
        
        // Set up new interval
        this.autoSplatInterval = setInterval(() => {
            if (!this.config.PAUSED) {
                // Create random auto splats around the screen
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height;
                
                // Create burst of splats at random position
                this.createMultiSplat(x, y, Math.floor(Math.random() * 3) + 2);
            }
        }, this.config.AUTO_SPLAT_INTERVAL);
    }
    
    // Create multiple splats in a pattern around a center point
    createMultiSplat(x, y, count = 3) {
        // Create a central splat
        const centerColor = this.generateColor();
        this.splat(x, y, 0, 0, centerColor);
        
        // Create surrounding splats
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const distance = Math.random() * 50 + 20;
            const splashX = x + Math.cos(angle) * distance;
            const splashY = y + Math.sin(angle) * distance;
            
            // Calculate velocity based on direction from center
            const dx = Math.cos(angle) * (Math.random() * this.config.SPLAT_FORCE * 0.15);
            const dy = Math.sin(angle) * (Math.random() * this.config.SPLAT_FORCE * 0.15);
            
            // Use similar but slightly varied colors for coherence
            const color = [...centerColor];
            color[0] = Math.max(0, Math.min(1, color[0] + (Math.random() * 0.3 - 0.15)));
            color[1] = Math.max(0, Math.min(1, color[1] + (Math.random() * 0.3 - 0.15)));
            color[2] = Math.max(0, Math.min(1, color[2] + (Math.random() * 0.3 - 0.15)));
            
            this.splat(splashX, splashY, dx, dy, color);
        }
    }
    
    // Start animation loop
    startAnimation() {
        const update = () => {
            this.update();
            requestAnimationFrame(update);
        };
        update();
    }

    // Animation loop with enhanced effects
    update() {
        if (this.config.PAUSED) return;
        
        // Calculate delta time, capped to prevent instability
        const now = Date.now();
        const dt = Math.min((now - this.lastUpdateTime) / 1000, 0.016);
        this.lastUpdateTime = now;
        
        // Handle pointer interactions
        const pointer = this.pointers[0];
        if (pointer.moved) {
            pointer.moved = false;
            // Add a stronger effect for more visible splats
            const splatForce = this.config.SPLAT_FORCE * 0.12;
            
            // Main splat at pointer position
            this.splat(pointer.x, pointer.y, pointer.dx * splatForce, pointer.dy * splatForce, pointer.color);
            
            // Sometimes add trailing splats for fast movement
            if (Math.abs(pointer.dx) + Math.abs(pointer.dy) > 20) {
                // Add a trailing effect for fast movements
                for (let i = 1; i <= 3; i++) {
                    const trailFactor = i * 0.2;
                    const trailX = pointer.x - pointer.dx * trailFactor;
                    const trailY = pointer.y - pointer.dy * trailFactor;
                    const trailSize = 1.0 - (i * 0.2);
                    
                    // Create smaller trailing splats with slightly varied color
                    const trailColor = [...pointer.color];
                    trailColor[0] = Math.max(0, Math.min(1, trailColor[0] + (Math.random() * 0.2 - 0.1)));
                    trailColor[1] = Math.max(0, Math.min(1, trailColor[1] + (Math.random() * 0.2 - 0.1)));
                    trailColor[2] = Math.max(0, Math.min(1, trailColor[2] + (Math.random() * 0.2 - 0.1)));
                    
                    this.splat(
                        trailX, trailY,
                        pointer.dx * splatForce * 0.5,
                        pointer.dy * splatForce * 0.5,
                        trailColor
                    );
                }
            }
        }
        
        if (pointer.down) {
            // Add stronger, more colorful splats when pointer is pressed
            const speed = this.config.SPLAT_FORCE * 0.2;
            
            // Create a burst of splats around the cursor when pressed
            for (let i = 0; i < 2; i++) { // Create 2 splats per frame when pressed
                const randomAngle = Math.random() * Math.PI * 2;
                const randomSize = Math.random() * 0.5 + 0.7; // Larger size
                const randomDistance = Math.random() * 30;
                
                const dx = Math.cos(randomAngle) * speed * randomSize;
                const dy = Math.sin(randomAngle) * speed * randomSize;
                
                const offsetX = Math.cos(randomAngle) * randomDistance;
                const offsetY = Math.sin(randomAngle) * randomDistance;
                
                // Generate new color for each splat when mouse is pressed
                pointer.color = this.generateColor();
                this.splat(pointer.x + offsetX, pointer.y + offsetY, dx, dy, pointer.color);
            }
        }
        
        // Update simulation
        this.updateSimulation(dt);
        
        // Render the final scene
        this.render();
    }

    // Update the fluid simulation
    updateSimulation(dt) {
        // Advect velocity field
        this.advect(
            this.velocityTexture,
            this.velocityTexture,
            this.velocityTexture,
            this.config.VELOCITY_DISSIPATION,
            dt
        );
        
        // Advect density/dye field
        this.advect(
            this.densityTexture,
            this.velocityTexture,
            this.densityTexture,
            this.config.DENSITY_DISSIPATION,
            dt
        );
    }

    // Render the final scene with bloom effect
    render() {
        const gl = this.gl;
        
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.useProgram(this.displayProgram);
        
        // Set bloom parameters
        gl.uniform1i(gl.getUniformLocation(this.displayProgram, 'uTexture'), this.densityTexture.read.attach(0));
        gl.uniform1f(gl.getUniformLocation(this.displayProgram, 'bloomIntensity'), this.config.BLOOM_INTENSITY);
        gl.uniform1f(gl.getUniformLocation(this.displayProgram, 'bloomThreshold'), this.config.BLOOM_THRESHOLD);
        gl.uniform1i(gl.getUniformLocation(this.displayProgram, 'enableBloom'), this.config.BLOOM ? 1 : 0);
        
        this.bindFBO(null); // Render to screen
        this.drawQuad();
        
        gl.disable(gl.BLEND);
    }
}

// Initialize the fluid splash cursor effect when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.fluidCursor = new FluidSplashCursor();
        console.log('Fluid splash cursor initialized');
        
        // Create multiple splats after a short delay for a more impressive initial effect
        setTimeout(() => {
            const { width, height } = window.fluidCursor.canvas;
            // Create a pattern of splats across the screen
            for (let i = 0; i < 5; i++) {
                const x = width * (0.3 + Math.random() * 0.4); // Center area of screen
                const y = height * (0.3 + Math.random() * 0.4); // Center area of screen
                const dx = Math.random() * 30 - 15;
                const dy = Math.random() * 30 - 15;
                
                window.fluidCursor.splat(
                    x, y, dx, dy,
                    window.fluidCursor.generateColor()
                );
            }
        }, 500);
    } catch (error) {
        console.error('Failed to initialize fluid splash cursor:', error);
    }
});
