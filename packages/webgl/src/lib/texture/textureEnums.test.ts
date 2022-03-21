import {
	inferFormatFromStorageFormat,
	TextureCompareFunc,
	TextureCompareMode,
	TextureFormat,
	TextureStorageFormat,
	TextureMagFilter,
	TextureMinFilter,
	TextureDataType,
	TextureWrap,
} from './textureEnums';


const gl = WebGL2RenderingContext;


function compare( set: Map<number, number> ): void {
	set.forEach( ( value, key ) => {
		expect( key ).toBeDefined();
		expect( key ).toEqual( value );
	} );
}


describe( 'Texture Enums', () => {
	it( 'TextureMagFilter should match GL constants', () => {
		compare( new Map([
			[TextureMagFilter.linear, gl.LINEAR],
			[TextureMagFilter.nearest, gl.NEAREST],
		]) );
	} );

	it( 'TextureMinFilter should match GL constants', () => {
		compare( new Map([
			[TextureMinFilter.linear, gl.LINEAR],
			[TextureMinFilter.linearMipmapLinear, gl.LINEAR_MIPMAP_LINEAR],
			[TextureMinFilter.linearMipmapNearest, gl.LINEAR_MIPMAP_NEAREST],
			[TextureMinFilter.nearest, gl.NEAREST],
			[TextureMinFilter.nearestMipmapLinear, gl.NEAREST_MIPMAP_LINEAR],
			[TextureMinFilter.nearestMipmapNearest, gl.NEAREST_MIPMAP_NEAREST],
		]) );
	} );

	it( 'TextureCompareFunc should match GL constants', () => {
		compare( new Map([
			[TextureCompareFunc.always, gl.ALWAYS],
			[TextureCompareFunc.equal, gl.EQUAL],
			[TextureCompareFunc.greater, gl.GREATER],
			[TextureCompareFunc.greaterOrEqual, gl.GEQUAL],
			[TextureCompareFunc.less, gl.LESS],
			[TextureCompareFunc.lessOrEqual, gl.LEQUAL],
			[TextureCompareFunc.never, gl.NEVER],
			[TextureCompareFunc.notEqual, gl.NOTEQUAL],
		]) );
	} );

	it( 'TextureCompareMode should match GL constants', () => {
		compare( new Map([
			[TextureCompareMode.none, gl.NONE],
			[TextureCompareMode.compareRefToTexture, gl.COMPARE_REF_TO_TEXTURE],
		]) );
	} );

	it( 'TextureWrap should match GL constants', () => {
		compare( new Map([
			[TextureWrap.clampToEdge, gl.CLAMP_TO_EDGE],
			[TextureWrap.mirroredRepeat, gl.MIRRORED_REPEAT],
			[TextureWrap.repeat, gl.REPEAT],
		]) );
	} );

	it( 'TextureDataType should match GL constants', () => {
		compare( new Map([
			[TextureDataType.unsignedShort565, gl.UNSIGNED_SHORT_5_6_5],
			[TextureDataType.unsignedShort4444, gl.UNSIGNED_SHORT_4_4_4_4],
			[TextureDataType.unsignedShort5551, gl.UNSIGNED_SHORT_5_5_5_1],
			[TextureDataType.unsignedInt2101010Rev, gl.UNSIGNED_INT_2_10_10_10_REV],
			[TextureDataType.unsignedInt10f11f11fRev, gl.UNSIGNED_INT_10F_11F_11F_REV],
			[TextureDataType.unsignedInt5999Rev, gl.UNSIGNED_INT_5_9_9_9_REV],
			[TextureDataType.unsignedInt248, gl.UNSIGNED_INT_24_8],
			[TextureDataType.float32UnsignedInt248Rev, gl.FLOAT_32_UNSIGNED_INT_24_8_REV],
		]) );
	} );

	it( 'TextureFormat should match GL constants', () => {
		compare( new Map([
			[TextureFormat.alpha, gl.ALPHA],
			[TextureFormat.luminance, gl.LUMINANCE],
			[TextureFormat.luminanceAlpha, gl.LUMINANCE_ALPHA],
			[TextureFormat.red, gl.RED],
			[TextureFormat.redInteger, gl.RED_INTEGER],
			[TextureFormat.rg, gl.RG],
			[TextureFormat.rgInteger, gl.RG_INTEGER],
			[TextureFormat.rgb, gl.RGB],
			[TextureFormat.rgbInteger, gl.RGB_INTEGER],
			[TextureFormat.rgba, gl.RGBA],
			[TextureFormat.rgbaInteger, gl.RGBA_INTEGER],
		]) );
	} );

	describe( 'TextureStorageFormat', () => {
		it( 'should contain and match all byte formats', () => {
			['r', 'rg', 'rgb', 'rgba'].forEach( ( components ) => {
				['', 'snorm'].forEach( ( suffix ) => {
					const member = `${components}8${suffix}`;
					const constant = `${components.toUpperCase()}8${suffix ? `_${suffix.toUpperCase()}` : ''}`;

					expect(
						TextureStorageFormat[member as never],
					).toBeDefined();

					expect(
						TextureStorageFormat[member as never],
					).toEqual(
						( gl as never )[constant],
					);
				} );
			} );
		} );

		it( 'should contain and match all float formats', () => {
			['r', 'rg', 'rgb', 'rgba'].forEach( ( components ) => {
				[16, 32].forEach( ( bits ) => {
					const member = `${components}${bits}f`;

					expect(
						TextureStorageFormat[member as never],
					).toBeDefined();

					expect(
						TextureStorageFormat[member as never],
					).toEqual(
						( gl as never )[member.toUpperCase()],
					);
				} );
			} );
		} );

		it( 'should contain and match all integer formats', () => {
			['r', 'rg', 'rgb', 'rgba'].forEach( ( components ) => {
				[8, 16, 32].forEach( ( bits ) => {
					['i', 'ui'].forEach( ( type ) => {
						const member = `${components}${bits}${type}`;

						expect(
							TextureStorageFormat[member as never],
						).toBeDefined();

						expect(
							TextureStorageFormat[member as never],
						).toEqual(
							( gl as never )[member.toUpperCase()],
						);
					} );
				} );
			} );
		} );

		it( 'should contain and match all remaining formats', () => {
			compare( new Map([
				[TextureStorageFormat.alpha, gl.ALPHA],
				[TextureStorageFormat.luminance, gl.LUMINANCE],
				[TextureStorageFormat.luminanceAlpha, gl.LUMINANCE_ALPHA],
				[TextureStorageFormat.rgb565, gl.RGB565],
				[TextureStorageFormat.rgba4, gl.RGBA4],
				[TextureStorageFormat.rgb5a1, gl.RGB5_A1],
				[TextureStorageFormat.rgb10a2, gl.RGB10_A2],
				[TextureStorageFormat.rgb10a2ui, gl.RGB10_A2UI],
				[TextureStorageFormat.srgb8, gl.SRGB8],
				[TextureStorageFormat.srgb8alpha8, gl.SRGB8_ALPHA8],
				[TextureStorageFormat.r11fg11fb10f, gl.R11F_G11F_B10F],
				[TextureStorageFormat.rgb9e5, gl.RGB9_E5],
			]) );
		} );
	} );

	describe( 'inferFormatFromInternalFormat', () => {
		it( 'should be exhaustive', () => {
			Object.values( TextureStorageFormat ).forEach( ( internal ) => {
				// typescript includes reverse lookups in
				// compiled enums, filter those out
				if ( typeof internal !== 'string' ) {
					expect(
						inferFormatFromStorageFormat( internal ),
					).toBeDefined();
				}
			} );
		} );

		// it( 'should infer the correct formats' );
	} );
} );
